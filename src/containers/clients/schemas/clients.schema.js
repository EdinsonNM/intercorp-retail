import * as yup from 'yup';

export const schema = yup.object().shape({
    firstname: yup.string().required('Nombre es requerido'),
    lastname: yup.string().required('Apellidos es requerido'),
    birthday: yup
        .date()
        .required('Fecha de nacimiento  es requerido')
        .typeError('Fecha incorrecta')
});
