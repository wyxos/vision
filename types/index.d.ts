import { App, Ref } from 'vue';

export interface FormError {
  key: string;
  message: string;
}

export interface FormErrorsInterface {
  createBag(bag: string): void;
  set(error: any, bag?: string): void;
  has(key: string, bag?: string): boolean;
  setOne(key: string, message: string, bag?: string): void;
  get(key: string | string[], bag?: string): { message: string; variant: string };
  clear(key?: string | null, bag?: string): void;
  all(bag?: string): FormError[];
}

export class FormErrors implements FormErrorsInterface {
  constructor();
  static create(): FormErrors;

  errors: Record<string, FormError[]>;

  createBag(bag: string): this;
  set(error: any, bag?: string): this;
  has(key: string, bag?: string): boolean;
  setOne(key: string, message: string, bag?: string): this;
  get(key: string | string[], bag?: string): { message: string; variant: string };
  clear(key?: string | null, bag?: string): this;
  all(bag?: string): FormError[];
}

/**
 * @deprecated Use FormErrors.create() instead
 */
export function useFormErrors(): FormErrors;

export interface FormState {
  loading: boolean;
  loaded: boolean;
  successful: boolean;
  failed: boolean;
  wasLoading: boolean;
  wasSubmitting: boolean;
}

export interface FormCallbacks {
  submit: ((data: any) => any) | null;
  load: ((data: any) => any) | null;
  success: ((data: any) => any) | null;
  failure: ((error: any) => any) | null;
}

export class FormBuilder<T extends Record<string, any> = Record<string, any>> {
  constructor(form?: T);
  static create<T extends Record<string, any>>(form?: T): FormBuilder<T>;

  // Properties
  form: T;
  original: T;
  transformCallback: ((data: T) => any) | null;
  forceFormDataFlag: boolean;
  errors: FormErrors;
  state: FormState;
  resetAfterSubmitFlag: boolean;
  callbacks: FormCallbacks;
  abortSubmitController: AbortController | null;
  abortLoadController: AbortController | null;

  // State getters
  readonly successful: boolean;
  readonly failed: boolean;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly wasLoading: boolean;
  readonly wasSubmitting: boolean;

  readonly isSubmitting: boolean;
  readonly isSubmitted: boolean;
  readonly isLoading: boolean;
  readonly isLoaded: boolean;
  readonly isLoadFailed: boolean;

  // Methods
  resetAfterSubmit(flag?: boolean): this;
  setAttributes(form: Partial<T>): this;
  forceFormData(flag?: boolean): this;

  get(url: string, options?: any): Promise<any>;
  post(url: string, options?: any): Promise<any>;
  patch(url: string, options?: any): Promise<any>;
  put(url: string, options?: any): Promise<any>;
  delete(url: string, options?: any): Promise<any>;
  submit(method: string, url: string, options?: any): Promise<any>;
  load(url: string, options?: any): Promise<any>;

  setSubmitting(): this;
  setSubmitted(): this;
  setFailed(): this;
  setLoading(): this;
  setLoaded(): this;
  setLoadFailed(): this;

  transform(callback: (data: T) => any): this;

  getError(key: string): { message: string; variant: string };
  hasError(key: string): boolean;
  clearError(key: string): void;
  clearErrors(): void;
  getErrors(): FormError[];
  hasErrors(): boolean;
  setError(field: string, value: string): this;

  onSuccess(callback: (data: any) => any): this;
  onFail(callback: (error: any) => any): this;

  toJson(): T;
  reset(): this;
}

export interface ListingAttributes<Item> {
  items: Item[];
  showing: number;
  perPage: number;
  total: number;
}

export interface ListingCallbacks {
  success: ((data: any) => any) | null;
  failure: ((error: any) => any) | null;
}

export class Filter<Q extends Record<string, any> = Record<string, any>> {
  constructor(query: Q);
  query: Q;
  applied: any[];
  original: Q;
  readonly isDirty: boolean;
  reset(): this;
  clear(key?: keyof Q): this;
}

export class Listing<Q extends Record<string, any> = Record<string, any>, Item = any> {
  constructor(query: Q);
  static create<Q extends Record<string, any>>(query: Q): Listing<Q>;

  // Properties
  loadUrl: string;
  loadState: Ref<string>;
  searchState: Ref<string>;
  refreshState: Ref<string>;
  attributes: ListingAttributes<Item>;
  filter: Filter<Q>;
  router: any;
  transformCallback: ((query: Q) => Q) | null;
  formatCallback: ((response: any) => any) | null;
  callbacks: ListingCallbacks;
  abortLoadController: AbortController | null;
  abortSearchController: AbortController | null;
  abortRefreshController: AbortController | null;

  // State getters
  readonly isLoading: boolean;
  readonly isLoaded: boolean;
  readonly isLoadFailed: boolean;
  readonly isSearching: boolean;
  readonly isSearched: boolean;
  readonly isSearchFailed: boolean;
  readonly isRefreshing: boolean;
  readonly isRefreshed: boolean;
  readonly isRefreshFailed: boolean;
  readonly isDirty: boolean;
  readonly config: any;
  readonly events: { pageChange: (page: number) => any };

  // Methods
  filterEmptyParams(query: Record<string, any>): Record<string, any>;
  setFilter(attributes: Q): this;
  search(preserveEmpty?: boolean): Promise<any>;
  load(url: string): Promise<any>;
  refresh(): Promise<any>;
  loading(): this;
  loaded(): this;
  loadFailed(): this;
  searching(): this;
  searched(): this;
  searchFailed(): this;
  refreshing(): this;
  refreshed(): this;
  refreshFailed(): this;
  onPageChange(page: number): Promise<any>;
  reset(): Promise<any>;
  clear(key?: keyof Q): Promise<any>;
  useRouter(router: any, route: any): this;
  next(): Promise<any>;
  resetSearch(): Promise<any>;
  transform(callback: (query: Q) => Q): this;
  format(callback: (response: any) => any): this;
  processResponse(response: any): any;
  onSuccess(callback: (data: any) => any): this;
  onFail(callback: (error: any) => any): this;
}

export default function Vision(app: App, options?: any): void;
