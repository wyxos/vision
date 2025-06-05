import { App } from 'vue';

export interface FormError {
  key: string;
  message: string;
}

export interface FormErrors {
  createBag(bag: string): void;
  set(error: any, bag?: string): void;
  has(key: string, bag?: string): boolean;
  setOne(key: string, message: string, bag?: string): void;
  get(key: string | string[], bag?: string): { message: string; variant: string };
  clear(key?: string | null, bag?: string): void;
  all(bag?: string): FormError[];
}

export class FormBuilder<T extends Record<string, any> = Record<string, any>> {
  constructor(form?: T);
  static create<T extends Record<string, any>>(form?: T): FormBuilder<T>;

  form: T;
  original: T;

  readonly isSubmitting: boolean;
  readonly isSubmitted: boolean;
  readonly isSubmitFailed: boolean;
  readonly isLoading: boolean;
  readonly isLoaded: boolean;
  readonly isLoadFailed: boolean;

  resetAfterSubmit(flag?: boolean): this;
  setAttributes(form: Partial<T>): this;
  forceFormData(flag?: boolean): this;

  get(url: string, options?: any): Promise<any>;
  post(url: string, options?: any): Promise<any>;
  patch(url: string, options?: any): Promise<any>;
  put(url: string, options?: any): Promise<any>;
  delete(url: string, options?: any): Promise<any>;
  submit(method: string, url: string, options?: any): Promise<any>;
  load(url: string): Promise<any>;

  submitting(): this;
  submitted(): this;
  submitFailed(): this;
  loading(): this;
  loaded(): this;
  loadFailed(): this;

  transform(callback: (data: T) => any): this;

  getError(key: string): { message: string; variant: string };
  hasError(key: string): boolean;
  clearError(key: string): void;
  clearErrors(): void;
  getErrors(): FormError[];

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

export class Listing<Q extends Record<string, any> = Record<string, any>, Item = any> {
  constructor(query: Q);
  static create<Q extends Record<string, any>>(query: Q): Listing<Q>;

  loadUrl: string;
  attributes: ListingAttributes<Item>;
  readonly isLoading: boolean;
  readonly isLoaded: boolean;
  readonly isDirty: boolean;

  setFilter(attributes: Q): this;
  search(query?: Partial<Q> | ((current: Q) => Partial<Q>)): Promise<any> | any;
  load(query?: Partial<Q> | ((current: Q) => Partial<Q>)): Promise<any>;
  refresh(query?: Partial<Q> | ((current: Q) => Partial<Q>)): Promise<any>;
  loading(): void;
  loaded(): void;
  onPageChange(page: number): any;
  loadFrom(path: string): this;
  reset(): Promise<any>;
  clear(key?: keyof Q): Promise<any>;
  useRouter(router: any, route: any): this;
  next(): Promise<any>;
  resetSearch(): Promise<any>;
  transform(callback: (query: Q) => Q): this;

  get config(): any;
  get events(): { pageChange: (page: number) => any };
}

export default function Vision(app: App, options?: any): void;
