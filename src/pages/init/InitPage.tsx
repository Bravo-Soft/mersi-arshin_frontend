import Fallback from 'components/Fallback';
import { useInitializeSession } from 'hooks/useInitializeSession';

export default function InitPage() {
	useInitializeSession();

	return <Fallback />;
}
