import { useFormContext } from 'react-hook-form';

type Props = { indexK: number; index: number };
const useNameGenerator = ({ indexK, index }: Props) => {
	const { register } = useFormContext();

	const { name: linkName } = register(`subscribedEmails.${index}.linkOperator`);

	const { name: columnName } = register(
		`subscribedEmails.${index}.emailFilters.${indexK}.columnFilter`
	);

	return { linkName, columnName };
};

export default useNameGenerator;
