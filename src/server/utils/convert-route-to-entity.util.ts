const mapping: Record<string, string> = {
  cars: 'car',
  'car-makers': 'car_maker',
  'car-models': 'car_model',
  'car-shops': 'car_shop',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
