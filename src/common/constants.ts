// eslint-disable-next-line max-len
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const namePattern = /^[A-Za-z-]*$/;
export interface SidebarItem {
  path: string;
  title: string;
  icon: string;
}
const clientUrls: SidebarItem[] = [
  { path: '/console', title: 'Dashboard', icon: 'bi-house-door' },
  { path: '/console/specialization', title: 'Specialization', icon: 'bi-layers' },
  { path: '/console/sessions', title: 'Appointments', icon: 'bi-layers' },
  { path: '/console/users', title: 'Users', icon: 'bi-people' },
  { path: '/console/chat', title: 'Messaging', icon: 'bi-gear' },
  { path: '/console/settings', title: 'Settings', icon: 'bi-gear' },
];

const specializationList: string[] = [
  "Gynaecology",
  "General Physician",
  "Dermatology",
  "Sexology",
  "Psychiatry",
  "Pediatrics",
  "Ear, Nose, Throat",
  "Urology",
  "Orthopedic",
  "Neurology",
  "Cardiology",
  "Diet & Nutrition",
  "Diabetology",
  "Ophthalmology",
  "Dentistry",
  "Pulmonology",
  "Ayurveda",
  "Homeopathy",
  "Oncology",
  "Physiotherapy",
  "General Surgery",
  "Psychology",
  "Nephrology",
  "Rheumatology",
  "Gastroenterology",
  "Veterinary"
];

export {
  emailPattern,
  namePattern,
  clientUrls,
  specializationList
};
