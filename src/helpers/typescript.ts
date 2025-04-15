export type OverrideProps<T, V> = Omit<T, keyof V> & V
