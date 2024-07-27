export interface LastLocation {
  pathname: string;
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface UserData {
  idUtente: number;
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  citta: string;
  indirizzo: string;
  cap: string;
  role: string;
}
export interface LoginResponse {
  token: string;
  utente: UserData;
}
export interface AziendaData {
  idAzienda: number;
  nomeAzienda: string;
  partitaIva: string;
  email: string;
  citta: string;
  telefono: string;
  indirizzo: string;
  cap: string;
  role: string;
}
export interface LoginAziendaResponse {
  token: string;
  azienda: AziendaData;
}
export interface RegisterDto {
  email: string;
  password: string;
  nome: string;
  cognome: string;
  cellulare: string;
  indirizzo: string;
  citta: string;
  cap: string;
  confermaPassword?: string;
}
export interface RegisterAziendaDto {
  email: string;
  password: string;
  nomeAzienda: string;
  partitaIva: string;
  telefono: string;
  indirizzo: string;
  citta: string;
  cap: string;
  confermaPassword?: string;
}
export interface CoordinateSearch {
  lat: number;
  lon: number;
  display_name: string;
}
export interface OSMResponse {
  x: number;
  y: number;
  label: string;
}
export interface categorieRistorante {
  idCategorie: number;
  nomeCategoria: string;
}
export interface GiorniDiChiusura {
  nomeGiorno: string;
  numeroGiorno: number;
  idGiorniChiusura?: number;
}
export interface ListaRistorantiResponse {
  idAzienda: number;
  idRistorante: number;
  nomeRistorante: string;
  tagRistorante: string;
  indirizzo: string;
  citta: string;
  cap: string;
  latitudine: string;
  longitudine: string;
  telefono: string;
  orarioApertura: string;
  orarioChiusura: string;
  imgCopertina: string | null;
  imgLogo: string | null;
  descrizione: string | null;
  categorieRistorante: categorieRistorante[];
  giorniDiChiusura: GiorniDiChiusura[];
  distanza: number;
}
export interface IngredientiProdottiLocale {
  idIngrediente: number;
  nomeIngrediente: string;
  prezzoIngrediente: number;
  isAttivo?: boolean;
}
export interface TipiProdottoLocale {
  idTipoProdotto: number;
  nomeTipoProdotto: string;
}
export interface ProdottiLocale {
  idProdottoRistorante: number;
  nomeProdotto: string;
  prezzoProdotto: number;
  descrizioneProdotto: string | null;
  imgProdotto: string | null;
  isAttivo?: boolean;
  ingredienti: IngredientiProdottiLocale[];
  categoriaProdotto?: TipiProdottoLocale[];
  tipiProdotto: TipiProdottoLocale[];
}
export interface LocaleIdResponse {
  idAzienda: number;
  partitaIva: string;
  idRistorante: number;
  nomeRistorante: string;
  indirizzo: string;
  citta: string;
  cap: string;
  latitudine: string;
  longitudine: string;
  telefono: string;
  orarioApertura: string;
  orarioChiusura: string;
  imgCopertina: string | null;
  imgLogo: string | null;
  descrizione: string | null;
  ingredientiRistorante: IngredientiProdottiLocale[];
  categorieRistorante: categorieRistorante[];
  giorniDiChiusura: GiorniDiChiusura[];
  prodotti: ProdottiLocale[];
}
export interface CartIngredient {
  idIngrediente: number;
  nomeIngrediente: string;
  prezzoIngrediente: number;
  quantita: number;
  isExtra: boolean;
}
export interface CartProduct {
  idProdotto: number;
  uniqueId: string;
  nomeProdotto: string;
  prezzoProdotto: number;
  quantita: number;
  totale?: number;
  ingredienti: CartIngredient[];
}
export interface CartOrderDto {
  idRistorante: number;
  indirizzoDiConsegna: string;
  orarioConsegnaPrevista: string;
  note?: string;
  totale?: number;
  prodotti: CartProduct[];
}
export interface UtenteProfileDto {
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  indirizzo: string;
  citta: string;
  cap: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
export interface GetUtenteOrdini {
  idOrdini: number;
  dataOrdine: string;
  orarioConsegnaPrevista: string;
  nomeRistorante: string;
  totaleOrdine: number;
  isOrdineEvaso: boolean;
  isOrdineConsegnato: boolean;
}
export interface GetUtenteResponse {
  idUtente: number;
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  citta: string;
  indirizzo: string;
  cap: string;
  role: string;
  ordini: GetUtenteOrdini[];
}
export interface AziendaProfileDto {
  nomeAzienda: string;
  partitaIva: string;
  email: string;
  telefono: string;
  indirizzo: string;
  citta: string;
  cap: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
export interface EmailDto {
  nome: string;
  cognome: string;
  cellulare: string;
  email: string;
  indirizzo: string;
  citta: string;
  messaggio: string;
}
export interface GetRistorantiByIdAziendaResponse {
  idAzienda: number;
  idRistorante: number;
  nomeRistorante: string;
  isAttivo?: boolean;
  tagRistorante: string;
  indirizzo: string;
  citta: string;
  cap: string;
  latitudine: string;
  longitudine: string;
  telefono: string;
  orarioApertura: string;
  orarioChiusura: string;
  imgCopertina: string | null;
  imgLogo: string | null;
  descrizione: string | null;
  categorieRistorante: categorieRistorante[];
  giorniDiChiusura: GiorniDiChiusura[];
}
export interface BoIngredientiAcquistati {
  idIngrediente: number;
  nomeIngrediente: string;
  prezzoIngrediente: number;
  quantita: number;
  isExtra: boolean;
  isAttivo: boolean;
}
export interface BoProdottiAcquistati {
  idProdottoRistorante: number;
  nomeProdotto: string;
  descrizioneProdotto: string;
  prezzoProdotto: number;
  imgProdotto: string | null;
  isAttivo: boolean;
  quantita: number;
  prezzoTotale?: number;
  categorieProdotto: TipiProdottoLocale[];
  ingredientiAcquistati: BoIngredientiAcquistati[];
}
export interface BoOrdiniLocaleId {
  idOrdini: number;
  dataOrdine: string;
  orarioConsegnaPrevista: string;
  indirizzoConsegna: string;
  isOrdineEvaso: boolean;
  isOrdineConsegnato: boolean;
  isPagato: boolean;
  isRefunded: boolean;
  note?: string;
  totaleOrdine?: number;
  stripeSessionId: string;
  paymentIntentId?: string;
  utente: UserData;
  prodottiAcquistati: BoProdottiAcquistati[];
}
export interface GetBoLocaleIdResponse {
  idAzienda: number;
  partitaIva: string;
  idRistorante: number;
  nomeRistorante: string;
  isAttivo?: boolean;
  indirizzo: string;
  citta: string;
  cap: string;
  latitudine: string;
  longitudine: string;
  telefono: string;
  orarioApertura: string;
  orarioChiusura: string;
  imgCopertina: string | null;
  imgLogo: string | null;
  descrizione: string | null;
  tagRistorante: string;
  categorieRistorante: categorieRistorante[];
  giorniDiChiusura: GiorniDiChiusura[];
  ordini: BoOrdiniLocaleId[];
}
export interface LocalMainModalEditDto {
  idRistorante: number;
  ristorante: string;
  tag: string;
  telefono: string;
  descrizione: string;
  oraApertura: string;
  oraChiusura: string;
  indirizzo: string;
  citta: string;
  cap: string;
  latitudine: string;
  longitudine: string;
}
export interface GiorniDiChiusuraDto {
  idRistorante: number;
  idGiorniChiusura: number[];
}
export interface TagCategorieDto {
  idRistorante: number;
  IdTagCategoria: number[];
}
export interface LocalStatusDto {
  idRistorante: number;
  isAttivo: boolean;
}
export interface NewLocalDto {
  nomeRistorante: string;
  tagRistorante: string;
  telefono: string;
  descrizione: string;
  oraApertura: string;
  oraChiusura: string;
  indirizzo: string;
  citta: string;
  cap: string;
  latitudine?: string;
  longitudine?: string;
}
export interface CreateIngredientDto {
  localeId: number;
  nomeIngrediente: string;
  prezzoIngrediente: number;
  isAttivo: boolean;
}
export interface UpdateIngredientDto {
  idIngrediente: number;
  localeId: number;
  nomeIngrediente: string;
  prezzoIngrediente: number;
  isAttivo: boolean;
}
export interface GetTipoProdottoResponse {
  idTipoProdotto: number;
  nomeTipoProdotto: string;
}
export interface CreateProductDto {
  idRistorante: number;
  nomeProdotto: string;
  prezzoProdotto: number;
  isAttivo: boolean;
  descrizioneProdotto?: string | null;
  idTipiProdotto?: number | null;
  idIngredienti?: number[];
}
export interface EditProductDto {
  idRistorante: number;
  idProdottoRistorante: number;
  nomeProdotto: string;
  prezzoProdotto: number;
  isAttivo: boolean;
  descrizioneProdotto?: string | null;
  idTipiProdotto?: number | null;
  idIngredienti?: number[];
}
