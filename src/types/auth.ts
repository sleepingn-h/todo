export type AuthError = (error: Error) => void;

export type AuthUser = {
  status: 'SUCCESS' | 'FAIL';
  message: string;
  token?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = LoginFormData & {
  cpassword: string;
};
