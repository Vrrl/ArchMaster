import { Router } from '@core/infra/router';
import { v1router as ChallengeRouterV1 } from '@modules/challenge/routes';
import { v1router as AuthenticationRouterV1 } from '@modules/authentication/routes';

const router = new Router();

router.useRouter([ChallengeRouterV1]);
router.useRouter([AuthenticationRouterV1]);

export default router;
