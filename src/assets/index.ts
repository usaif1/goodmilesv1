import type { ImageSourcePropType } from 'react-native';

/**
 * Static image registry. Generated - re-run the extractor rather than
 * hand-editing.
 *
 * Metro resolves require() at build time, so the paths cannot be built
 * from data. Everything the app can show has to be listed here, keyed
 * by the name the data already uses.
 */

/** Car renders, keyed by model exactly as MODELS spells it. */
export const CAR_IMAGES: Record<string, ImageSourcePropType> = {
  "Swift": require('./cars/swift.png'),
  "Baleno": require('./cars/baleno.png'),
  "Dzire": require('./cars/dzire.png'),
  "Brezza": require('./cars/brezza.png'),
  "WagonR": require('./cars/wagonr.png'),
  "Ertiga": require('./cars/ertiga.png'),
  "Fronx": require('./cars/fronx.png'),
  "Grand Vitara": require('./cars/grandvitara.png'),
  "Alto K10": require('./cars/altok10.png'),
  "Creta": require('./cars/creta.png'),
  "Venue": require('./cars/venue.png'),
  "i20": require('./cars/i20.png'),
  "Verna": require('./cars/verna.png'),
  "Exter": require('./cars/exter.png'),
  "Grand i10 Nios": require('./cars/grandi10nios.png'),
  "Alcazar": require('./cars/alcazar.png'),
  "Aura": require('./cars/aura.png'),
  "Nexon": require('./cars/nexon.png'),
  "Punch": require('./cars/punch.png'),
  "Tiago": require('./cars/tiago.png'),
  "Altroz": require('./cars/altroz.png'),
  "Harrier": require('./cars/harrier.png'),
  "Safari": require('./cars/safari.png'),
  "XUV700": require('./cars/xuv700.png'),
  "Scorpio-N": require('./cars/scorpion.png'),
  "Thar": require('./cars/thar.png'),
  "XUV 3XO": require('./cars/xuv3xo.png'),
  "Bolero": require('./cars/bolero.png'),
  "Seltos": require('./cars/seltos.png'),
  "Sonet": require('./cars/sonet.png'),
  "Carens": require('./cars/carens.png'),
  "Innova Crysta": require('./cars/innovacrysta.png'),
  "Fortuner": require('./cars/fortuner.png'),
  "Glanza": require('./cars/glanza.png'),
  "Hyryder": require('./cars/hyryder.png'),
  "City": require('./cars/city.png'),
  "Amaze": require('./cars/amaze.png'),
  "Elevate": require('./cars/elevate.png'),
  "Hector": require('./cars/hector.png'),
  "Astor": require('./cars/astor.png'),
  "ZS EV": require('./cars/zsev.png'),
  "Slavia": require('./cars/slavia.png'),
  "Kushaq": require('./cars/kushaq.png'),
  "Kylaq": require('./cars/kylaq.png'),
  "Virtus": require('./cars/virtus.png'),
  "Taigun": require('./cars/taigun.png'),
  "Kwid": require('./cars/kwid.png'),
  "Kiger": require('./cars/kiger.png'),
  "Triber": require('./cars/triber.png'),
  "Magnite": require('./cars/magnite.png'),
  "Compass": require('./cars/compass.png'),
  "Meridian": require('./cars/meridian.png'),
  "C3": require('./cars/c3.png'),
  "3 Series": require('./cars/3series.png'),
  "X1": require('./cars/x1.png'),
  "C-Class": require('./cars/cclass.png'),
  "GLA": require('./cars/gla.png'),
  "A4": require('./cars/a4.png'),
  "Q3": require('./cars/q3.png'),
  "Basalt": require('./cars/basalt.jpg'),
  "Windsor EV": require('./cars/windsorev.jpg'),
};

/** Manufacturer logos, keyed by brand. */
export const BRAND_IMAGES: Record<string, ImageSourcePropType> = {
  "Maruti Suzuki": require('./brands/marutisuzuki.png'),
  "Hyundai": require('./brands/hyundai.png'),
  "Tata": require('./brands/tata.png'),
  "Mahindra": require('./brands/mahindra.png'),
  "Kia": require('./brands/kia.png'),
  "Toyota": require('./brands/toyota.png'),
  "Honda": require('./brands/honda.png'),
  "MG": require('./brands/mg.png'),
  "Skoda": require('./brands/skoda.png'),
  "Volkswagen": require('./brands/volkswagen.png'),
  "Renault": require('./brands/renault.png'),
  "Nissan": require('./brands/nissan.png'),
  "Jeep": require('./brands/jeep.png'),
  "Citroen": require('./brands/citroen.png'),
  "BMW": require('./brands/bmw.png'),
  "Mercedes-Benz": require('./brands/mercedesbenz.png'),
  "Audi": require('./brands/audi.png'),
};

/** Category artwork, keyed by category id. */
export const CATEGORY_IMAGES: Record<string, ImageSourcePropType> = {
  "ac": require('./categories/ac.png'),
  "battery": require('./categories/battery.png'),
  "brakes": require('./categories/brakes.png'),
  "clutch": require('./categories/clutch.png'),
  "denting": require('./categories/denting.png'),
  "glass": require('./categories/glass.png'),
  "inspection": require('./categories/inspection.png'),
  "periodic": require('./categories/periodic.png'),
  "spa": require('./categories/spa.png'),
  "tyres": require('./categories/tyres.png'),
};

/** Service-day photographs: pickup angles, parts, the old-parts box. */
export const SERVICE_IMAGES: Record<string, ImageSourcePropType> = {
  "angle-front-left": require('./service/angle-front-left.jpg'),
  "angle-front-right": require('./service/angle-front-right.jpg'),
  "angle-interior": require('./service/angle-interior.jpg'),
  "angle-left-side": require('./service/angle-left-side.jpg'),
  "angle-odometer": require('./service/angle-odometer.jpg'),
  "angle-rear": require('./service/angle-rear.jpg'),
  "angle-right-side": require('./service/angle-right-side.jpg'),
  "angle-scratch": require('./service/angle-scratch.jpg'),
  "cover-brake-shoes": require('./service/cover-brake-shoes.jpg'),
  "cover-cooling-coil": require('./service/cover-cooling-coil.jpg'),
  "cover-headlight": require('./service/cover-headlight.jpg'),
  "engine": require('./service/engine.jpg'),
  "garage": require('./service/garage.jpg'),
  "handover-box": require('./service/handover-box.jpg'),
  "oldparts-box": require('./service/oldparts-box.jpg'),
  "oldparts": require('./service/oldparts.jpg'),
  "pads-old-new": require('./service/pads-old-new.jpg'),
  "pickup-photo": require('./service/pickup-photo.jpg'),
  "wrench": require('./service/wrench.jpg'),
};

/** Home banners. */
export const HOME_IMAGES: Record<string, ImageSourcePropType> = {
  "ban1": require('./home/ban1.jpg'),
  "ban2": require('./home/ban2.jpg'),
  "ban3": require('./home/ban3.jpg'),
  "ban4": require('./home/ban4.jpg'),
  "own1": require('./home/own1.jpg'),
  "own2": require('./home/own2.jpg'),
  "own3": require('./home/own3.jpg'),
};

export const carImage = (model?: string | null) =>
  model ? CAR_IMAGES[model] : undefined;
export const brandImage = (brand?: string | null) =>
  brand ? BRAND_IMAGES[brand] : undefined;
export const categoryImage = (id?: string | null) =>
  id ? CATEGORY_IMAGES[id] : undefined;
export const serviceImage = (key?: string | null) =>
  key ? SERVICE_IMAGES[key] : undefined;
