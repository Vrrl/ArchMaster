import container from '@core/injector';
import { Router } from '@core/infra/router';
import { SignUpController } from './use-cases/sign-up/sign-up-controller';
import { SignUpConfirmController } from './use-cases/sign-up-confirm/sign-up-confirm-controller';
import { SignUpResendVerificationCodeController } from './use-cases/sign-up-resend-verification-code/sign-up-resend-verification-code-controller';

const v1router = new Router('v1/auth');

v1router.post('/signup', container.resolve(SignUpController));
v1router.post('/signup/confirm', container.resolve(SignUpConfirmController));
v1router.post('/signup/resend-code', container.resolve(SignUpResendVerificationCodeController));

export { v1router };
