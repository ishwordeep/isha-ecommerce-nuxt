export default defineAppConfig({
  ui: {
    formField: {
      slots: {
        container: 'relative w-full',
      },
    },
    input: {
      defaultVariants: {
        size: 'lg',
      },
      slots: {
        root: 'relative w-full',
      },
      variants: {
        size: {
          xl: {
            base: 'py-2.5  text-base',
          },
        },
      },
    },
    select: {
      defaultVariants: {
        size: 'lg',
      },
      slots: {
        base: 'relative w-full',
      },
      variants: {
        size: {
          xl: {
            base: 'py-2.5  text-base',
          },
        },
      },
    },
    selectMenu: {
      defaultVariants: {
        size: 'lg',
      },
      slots: {
        base: 'relative w-full',
      },
      variants: {
        size: {
          xl: {
            base: 'py-2.5  text-base',
          },
        },
      },
    },
    inputTags: {
      defaultVariants: {
        size: 'lg',
      },
      slots: {
        base: 'relative w-full',
      },
      variants: {
        size: {
          xl: {
            base: 'py-2.5  text-base',
          },
        },
      },
    },
    textarea: {
      defaultVariants: {
        size: 'lg',
      },
      slots: {
        root: 'relative w-full',
      },
      variants: {
        size: {
          xl: {
            base: 'py-2.5  text-sm',
          },
        },
      },
    },
    button: {
      defaultVariants: {
        size: 'lg',
        color: 'primary',
      },
    },
    inputNumber: {
      defaultVariants: {
        size: 'lg',
      },
      slots: {
        root: 'relative w-full',
      },
      variants: {
        size: {
          xl: 'py-2.5  text-base',
        },
      },
    },
    pageGrid: {
      base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8',
    },
    table: {
      slots: {
        th: 'bg-primary/10',
        tr: 'hover:bg-primary/10',
      },
    },
    modal: {
      slots: {
        overlay: 'bg-black/60',
      },
    },
    drawer: {
      slots: {
        overlay: 'bg-black/60',
      },
    },
    slideover: {
      slots: {
        overlay: 'bg-black/60',
      },
    },
  },
})
