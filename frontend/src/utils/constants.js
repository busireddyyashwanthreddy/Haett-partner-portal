export const ROLES = {
  USER: 'user',
  PARTNER: 'partner',
  ADMIN: 'admin',
};

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const USER_APPLICATION_STATUS = {
  NONE: 'none',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const PARTNER_TYPES = [
  { value: 'influencer', label: 'Influencer' },
  { value: 'blogger', label: 'Blogger' },
  { value: 'retailer', label: 'Retailer' },
  { value: 'nutritionist', label: 'Nutritionist' },
  { value: 'other', label: 'Other' },
];

export const STORAGE_KEYS = {
  TOKEN: 'haett_token',
};

export const ROUTES = {
  HOME: '/',
  PARTNER: '/partner',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  ERROR: '/error',
};

export const BENEFITS = [
  {
    title: 'Earn Commissions',
    description: 'Get rewarded for every sale driven through your unique partner links.',
    icon: 'DollarSign',
  },
  {
    title: 'Discount Codes',
    description: 'Share exclusive Haett codes with your audience to boost conversions.',
    icon: 'Ticket',
  },
  {
    title: 'Partner Dashboard',
    description: 'Track usage, savings, and performance in one centralized portal.',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Business Growth',
    description: 'Scale your brand with a trusted health and nutrition partner program.',
    icon: 'TrendingUp',
  },
];
