export type OverrideProps<T, V> = Omit<T, keyof V>;

export type Headers = Record<string, string | null | undefined>;
