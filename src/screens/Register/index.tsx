import React, {useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Content from '_src/components/Content';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './Register.style';
import R from '_src/assets/R';
import {Link} from '@react-navigation/native';
import {useUser} from '_src/hooks';
import {useFormik} from 'formik';
import {User} from '_src/utils/types/user';
import {RegisterSchema} from '_src/utils/validators/auth';
import ErrorText from '_src/components/ErrorText';
export interface RegisterProps {}

interface InputRefs {
  last_name: TextInput | null;
  first_name: TextInput | null;
  email: TextInput | null;
  password: TextInput | null;
  passwordConfirm: TextInput | null;
}

const Register: React.FC<RegisterProps> = () => {
  const {signUp} = useUser();
  const [generalError, setGeneralErr] = useState();
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<InputRefs>({
    last_name: null,
    first_name: null,
    email: null,
    password: null,
    passwordConfirm: null,
  });
  const {handleChange, handleSubmit, setErrors, handleBlur, errors, touched} =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        passwordConfirm: '',
      } as User,
      validationSchema: RegisterSchema,
      onSubmit(values) {
        setGeneralErr(undefined);
        setLoading(true);
        signUp(values)
          .catch(({data}) => setErrors(data))
          .finally(() => setLoading(false));
      },
    });
  return (
    <Content style={style.content}>
      <View style={style.main}>
        <Text h1 style={style.title}>
          Regístrate
        </Text>
        <View style={style.form}>
          <Input
            autoCompleteType
            onChangeText={handleChange('first_name')}
            returnKeyType="next"
            onSubmitEditing={() => inputRefs.current.last_name?.focus()}
            onBlur={handleBlur('first_name')}
            errorMessage={touched.first_name ? errors.first_name : undefined}
            placeholder="Nombre"
            keyboardType="email-address"
            leftIcon={
              <Icon name="account-circle" size={25} color={R.colors.TEXT} />
            }
          />
          <Input
            autoCompleteType
            ref={r => (inputRefs.current.last_name = r)}
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            returnKeyType="next"
            onSubmitEditing={() => inputRefs.current.email?.focus()}
            errorMessage={touched.last_name ? errors.last_name : undefined}
            placeholder="Apellidos"
            keyboardType="email-address"
            leftIcon={
              <Icon name="account-circle" size={25} color={R.colors.TEXT} />
            }
          />
          <Input
            autoCompleteType
            ref={r => (inputRefs.current.email = r)}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            returnKeyType="next"
            onSubmitEditing={() => inputRefs.current.password?.focus()}
            errorMessage={touched.email ? errors.email : undefined}
            placeholder="Correo"
            keyboardType="email-address"
            leftIcon={<Icon name="mail" size={25} color={R.colors.TEXT} />}
          />
          <Input
            autoCompleteType
            ref={r => (inputRefs.current.password = r)}
            onChangeText={handleChange('password')}
            returnKeyType="next"
            onSubmitEditing={() => inputRefs.current.passwordConfirm?.focus()}
            onBlur={handleBlur('password')}
            errorMessage={touched.password ? errors.password : undefined}
            placeholder="Contraseña"
            secureTextEntry
            leftIcon={<Icon name="lock" size={25} color={R.colors.TEXT} />}
          />
          <Input
            autoCompleteType
            ref={r => (inputRefs.current.passwordConfirm = r)}
            onChangeText={handleChange('passwordConfirm')}
            onBlur={handleBlur('passwordConfirm')}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            errorMessage={
              touched.passwordConfirm ? errors.passwordConfirm : undefined
            }
            placeholder="Confirmar contraseña"
            secureTextEntry
            leftIcon={<Icon name="lock" size={25} color={R.colors.TEXT} />}
          />
          {!!generalError && <ErrorText error={generalError} />}
        </View>
        <View style={style.registerLine}>
          <Text style={style.registerQuestion}>¿Ya tienes cuenta?</Text>
          <Link to={{screen: 'login'}} style={style.register}>
            Inicia sesión
          </Link>
        </View>
      </View>
      <Button title="Iniciar sesión" loading={loading} onPress={handleSubmit} />
    </Content>
  );
};

export default Register;
