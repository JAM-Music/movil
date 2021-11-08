import React, {useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Content from '_src/components/Content';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './Login.style';
import R from '_src/assets/R';
import {Link} from '@react-navigation/native';
import {useFormik} from 'formik';
import {UserCredentials} from '_src/utils/types/user';
import {useUser} from '_src/hooks';
import {LoginSchema} from '_src/utils/validators/auth';

export type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const {logIn} = useUser();
  const [generalError, setGeneralErr] = useState();
  const [loading, setLoading] = useState(false);
  const passInput = useRef<TextInput | null>(null);
  const {handleChange, handleSubmit, setErrors, handleBlur, errors, touched} =
    useFormik({
      initialValues: {email: '', password: ''} as UserCredentials,
      validationSchema: LoginSchema,
      onSubmit(values) {
        setGeneralErr(undefined);
        setLoading(true);
        logIn(values)
          .catch(({data, status}) => {
            if (status === 401) {
              return setGeneralErr(data);
            }
            setErrors(data);
          })
          .finally(() => setLoading(false));
      },
    });

  return (
    <Content style={style.content}>
      <View style={style.main}>
        <Text h1 style={style.title}>
          Inicia sesión
        </Text>
        <View style={style.form}>
          <Input
            autoCompleteType
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            onSubmitEditing={() => passInput.current?.focus()}
            errorMessage={touched.email ? errors.email : undefined}
            placeholder="Correo"
            keyboardType="email-address"
            returnKeyType="next"
            leftIcon={<Icon name="mail" size={25} color={R.colors.TEXT} />}
          />
          <Input
            autoCompleteType
            ref={r => (passInput.current = r)}
            placeholder="Contraseña"
            secureTextEntry
            onSubmitEditing={handleSubmit}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            errorMessage={touched.password ? errors.password : undefined}
            leftIcon={<Icon name="lock" size={25} color={R.colors.TEXT} />}
          />
          {!!generalError && <Text style={style.error}>{generalError}</Text>}
        </View>
        <View style={style.registerLine}>
          <Text style={style.registerQuestion}>¿No tienes cuenta?</Text>
          <Link to={{screen: 'register'}} style={style.register}>
            Regístrate
          </Link>
        </View>
      </View>
      <Button title="Iniciar sesión" onPress={handleSubmit} loading={loading} />
    </Content>
  );
};

export default Login;
