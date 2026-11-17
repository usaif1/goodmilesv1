import { forwardRef, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { NOTE_COPY, SYMPTOMS } from '@/data';
import { useApp } from '@/store';
import { Icon, layout, radius, typeScale, useTheme } from '@/theme';

import { Button } from '../Button';
import { Chip } from '../Chip';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

export type NoteSheetProps = {
  onClose: () => void;
  onSend: (note: { text: string; seconds: number }) => void;
};

const clock = (s: number) =>
  `0:${String(s).padStart(2, '0')}`;

/**
 * The note a customer leaves for Amit before pickup - symptoms, a voice
 * note, or just typed. Offered in Hindi as well as English, because
 * what is being described is a noise, not a form field.
 *
 * Recording is simulated, as it is in the prototype: capturing audio
 * needs a native module and somewhere to send it. The timer and states
 * are real so the flow can be judged.
 */
export const NoteSheet = forwardRef<BottomSheetModal, NoteSheetProps>(
  function NoteSheetBase({ onClose, onSend }, ref) {
    const { c } = useTheme();
    const car = useApp(s => s.car);
    const symptoms = useApp(s => s.symptoms);
    const toggleSymptom = useApp(s => s.toggleSymptom);

    const [hindi, setHindi] = useState(false);
    const [recording, setRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [recorded, setRecorded] = useState<number | null>(null);
    const [text, setText] = useState('');
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const copy = NOTE_COPY[hindi ? 'hi' : 'en'];
    const model = car?.model ?? 'car';

    useEffect(() => {
      if (recording) {
        timer.current = setInterval(() => setSeconds(s => s + 1), 1000);
      } else if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      return () => {
        if (timer.current) clearInterval(timer.current);
      };
    }, [recording]);

    const start = () => {
      setSeconds(0);
      setRecorded(null);
      setRecording(true);
    };
    const stop = () => {
      setRecording(false);
      setRecorded(seconds || 1);
    };

    const anything = symptoms.length > 0 || recorded !== null || !!text.trim();

    return (
      <Sheet
        ref={ref}
        title={copy.heading(model)}
        subtitle={copy.sub}
        snapPoints={['92%']}
        onClose={onClose}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hindi ? 'Switch to English' : 'Switch to Hindi'}
          onPress={() => setHindi(v => !v)}
          style={[styles.lang, { borderColor: c.line }]}
        >
          <Text variant="smallStrong">{hindi ? 'EN' : 'हिं'}</Text>
        </Pressable>

        <View style={styles.chips}>
          {SYMPTOMS.map(s => (
            <Chip
              key={s}
              label={s}
              selected={symptoms.includes(s)}
              onPress={() => toggleSymptom(s)}
            />
          ))}
        </View>

        {recorded !== null && !recording ? (
          <View style={[styles.playback, { borderColor: c.sel }]}>
            <View style={[styles.play, { backgroundColor: c.sel }]}>
              <Icon name="play" size={16} color="#ffffff" />
            </View>
            <View style={[styles.bar, { backgroundColor: c.line2 }]} />
            <Text variant="bodyStrong">{clock(recorded)}</Text>
            <Pressable accessibilityRole="button" onPress={() => setRecorded(null)}>
              <Icon name="close" size={18} color={c.muted} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.recorder}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={recording ? 'Stop recording' : copy.tap}
              onPress={recording ? stop : start}
              style={[styles.mic, { backgroundColor: recording ? c.redSolid : c.sel }]}
            >
              {recording ? (
                <View style={styles.stop} />
              ) : (
                <Icon name="mic" size={26} color="#ffffff" />
              )}
            </Pressable>
            <Text variant="smallStrong">
              {recording ? clock(seconds) : copy.tap}
            </Text>
            <Text variant="small" tone="muted" style={styles.centre}>
              {copy.lang}
            </Text>
          </View>
        )}

        <View style={[styles.textBox, { backgroundColor: c.card, borderColor: c.line }]}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={copy.placeholder}
            placeholderTextColor={c.muted}
            multiline
            accessibilityLabel={copy.placeholder}
            style={[styles.input, { color: c.ink }]}
          />
        </View>

        <View style={styles.prompts}>
          {copy.prompts.map(p => (
            <Text key={p} variant="small" tone="muted">
              · {p}
            </Text>
          ))}
        </View>

        <Button
          label={anything ? 'Send to Amit' : 'Skip for now'}
          variant={anything ? 'primary' : 'ghost'}
          onPress={() => onSend({ text: text.trim(), seconds: recorded ?? 0 })}
        />
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  centre: { textAlign: 'center' },
  lang: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: layout.hairline,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  recorder: { alignItems: 'center', gap: 8, paddingVertical: 8 },
  mic: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stop: { width: 18, height: 18, borderRadius: 3, backgroundColor: '#ffffff' },
  playback: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: radius.lg,
    borderWidth: layout.chipBorder,
  },
  play: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: { flex: 1, height: 4, borderRadius: 2 },
  textBox: {
    minHeight: 88,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  input: { ...typeScale.body, minHeight: 68, textAlignVertical: 'top' },
  prompts: { gap: 4 },
});
