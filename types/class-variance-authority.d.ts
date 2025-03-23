declare module "class-variance-authority" {
  export type VariantProps<Component extends (...args: any) => any> = Parameters<Component>[0]

  export function cva<V extends Record<string, any> = Record<string, any>, D extends string = string>(
    base?: string,
    config?: {
      variants?: V
      defaultVariants?: {
        [key in keyof V]?: string | undefined
      }
      compoundVariants?: Array<
        {
          [key in keyof V]?: string | undefined
        } & {
          class: string
          className: string
        }
      >
    },
  ): (
    options?: {
      [key in keyof V]?: string | undefined
    } & {
      class?: string
      className?: string
    },
  ) => string
}

