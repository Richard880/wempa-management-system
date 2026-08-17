import ROLES from "../../../../constants/roles";

export const ADMIN_MANAGEMENT_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
];

export const ADMIN_ROLE_TRANSITIONS = {
  [ROLES.SUPER_ADMIN]: {
    allowedTargets: [ROLES.MEMBER, ROLES.ADMIN],
    transitions: {
      [ROLES.MEMBER]: [ROLES.ADMIN],
      [ROLES.ADMIN]: [ROLES.MEMBER],
    },
  },

  [ROLES.ADMIN]: {
    allowedTargets: [],
    transitions: {},
  },
};

export function canManageAdminRoles(actorRole) {
  return actorRole === ROLES.SUPER_ADMIN;
}

export function isAllowedAdminRoleTransition(
  actorRole,
  currentTargetRole,
  newTargetRole
) {
  const actorRules = ADMIN_ROLE_TRANSITIONS[actorRole];

  if (!actorRules) {
    return false;
  }

  const allowedTransitions =
    actorRules.transitions[currentTargetRole] ?? [];

  return allowedTransitions.includes(newTargetRole);
}

export function isAdminRole(role) {
  return ADMIN_MANAGEMENT_ROLES.includes(role);
}