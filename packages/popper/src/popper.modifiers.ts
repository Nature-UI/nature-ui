import { Modifier, Placement, State } from '@popperjs/core';
import { cssVars, getBoxShadow, toTransformOrigin } from './popper.utils';

export const matchWidth: Modifier<'matchWidth', any> = {
  name: 'matchWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect:
    ({ state }) =>
    () => {
      const reference = state.elements.reference as HTMLElement;
      state.elements.popper.style.width = `${reference.offsetWidth}px`;
    },
};

const setTransformOrigin = (state: State) => {
  state.elements.popper.style.setProperty(
    cssVars.transformOrigin.var,
    toTransformOrigin(state.placement),
  );
};

export const transformOrigin: Modifier<'transformOrigin', any> = {
  name: 'transformOrigin',
  enabled: true,
  phase: 'write',
  fn: ({ state }) => {
    setTransformOrigin(state);
  },
  effect:
    ({ state }) =>
    () => {
      setTransformOrigin(state);
    },
};

const getArrowStyle = (placement: Placement) => {
  if (placement.startsWith('top')) {
    return { property: 'bottom', value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith('bottom')) {
    return { property: 'top', value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith('left')) {
    return { property: 'right', value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith('right')) {
    return { property: 'left', value: cssVars.arrowOffset.varRef };
  }
};

const setArrowStyles = (state: Partial<State>) => {
  if (!state.placement) return;
  const overrides = getArrowStyle(state.placement);

  if (state.elements?.arrow && overrides) {
    Object.assign(state.elements.arrow.style, {
      [overrides.property]: overrides.value,
      width: cssVars.arrowSize.varRef,
      height: cssVars.arrowSize.varRef,
      zIndex: -1,
    });
  }

  const vars = {
    [cssVars.arrowSizeHalf.var]: `calc(${cssVars.arrowSize.varRef} / 2)`,
    [cssVars.arrowOffset.var]: `calc(${cssVars.arrowSizeHalf.varRef} * -1)`,
  };

  for (const property in vars) {
    state.elements?.arrow?.style.setProperty(property, vars[property]);
  }
};

export const positionArrow: Modifier<'positionArrow', any> = {
  name: 'positionArrow',
  enabled: true,
  phase: 'afterWrite',
  fn: ({ state }) => {
    setArrowStyles(state);
  },
};

const setInnerArrowStyles = (state: State) => {
  if (!state.elements.arrow) return;

  const inner = state.elements.arrow.querySelector(
    '[data-popper-arrow-inner]',
  ) as HTMLElement | null;

  if (!inner) return;
  const boxShadow = getBoxShadow(state.placement);
  if (boxShadow) {
    inner.style.setProperty('--popper-arrow-default-shadow', boxShadow);
  }

  inner.classList.add(
    `rotate-45`,
    `top-0`,
    `left-0`,
    `w-full`,
    `h-full`,
    `absolute`,
    `z-[inherit]`,
  );

  Object.assign(inner.style, {
    boxShadow: `var(--popper-arrow-shadow, var(--popper-arrow-default-shadow))`,
  });
};

export const innerArrow: Modifier<'innerArrow', any> = {
  name: 'innerArrow',
  enabled: true,
  phase: 'main',
  requires: ['arrow'],
  fn: ({ state }) => {
    setInnerArrowStyles(state);
  },
  effect:
    ({ state }) =>
    () => {
      setInnerArrowStyles(state);
    },
};
