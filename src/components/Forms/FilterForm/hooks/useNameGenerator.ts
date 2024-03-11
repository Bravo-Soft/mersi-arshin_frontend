import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

type Props = { name: FieldPath<FieldValues> };
const useNameGenerator = ({ name }: Props) => {
	const { register } = useFormContext();

	const { name: fieldName } = register(name);

	const { name: columnName } = register(`${name}.columnFilter`);

	const { name: operatorName } = register(`${name}.operatorValue`);

	const { name: valueName } = register(`${name}.value`);

	return { columnName, operatorName, valueName, fieldName };
};

export default useNameGenerator;
