import useAuthStore from "@/store/authStore";
import useOtpStore from "@/store/useOtp";
import { Link, useRouter } from "expo-router";
import { useFormik } from "formik";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import AppInput from "../components/ui/AppInput";
import Button from "../components/ui/CusButton";

const commonAuthSchema = Yup.object().shape({
  name: Yup.string().required().label("Fullname"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signup = () => {
  const router = useRouter();
  const { updateLogin } = useAuthStore();
  const { setOtpDetails } = useOtpStore();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: commonAuthSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      setOtpDetails({
        email: values.email,
        password: values.password,
        name: values.name,
        otpToken: "dummy-token", // Replace with actual token if available
      });

      setTimeout(() => {
        router.replace("/screens/verifyOtp");
        setSubmitting(false);
      }, 4000);
    },
  });

  return (
    <View className="h-screen  bg-blue-600">
      <View className="h-60 items-center justify-center bg-blue-600">
        <View className="size-25 items-center justify-center bg-white rounded-full">
          <Image
            source={require("../../assets/images/cv-logo.png")}
            resizeMode="contain"
            className="w-15 h-15 mr-2"
          />
        </View>
      </View>

      <View className="flex-1 bg-slate-100 rounded-t-4xl pt-7">
        <View>
          <View className="mx-auto w-fit ">
            <View className="flex-row text-center">
              <Text className="text-4xl font-extrabold text-blue-600">
                Sign
              </Text>
              <Text className="text-4xl font-extrabold  text-yellow-400">
                up
              </Text>
            </View>
            <View className="w-17 h-1 mt-2 bg-blue-500" />
          </View>
          <Text className="text-center text-sm text-gray-400 mt-1">
            login to get started with Campus Vendor
          </Text>
        </View>

        <View className=" p-5 px-10 gap-4 mt-6">
          <View>
            <AppInput
              icon="account"
              value={formik.values.name}
              onChangeText={(text) => formik.setFieldValue("name", text)}
              onBlur={formik.handleBlur("name")}
              label="Full name"
              type="username"
            />
            {formik.touched.name && formik.errors.name ? (
              <Text className="text-red-500 text-xs mt-1 ml-4">
                {formik.errors.name}
              </Text>
            ) : null}
          </View>

          <View>
            <AppInput
              icon="email"
              value={formik.values.email}
              onChangeText={(text) => formik.setFieldValue("email", text)}
              onBlur={formik.handleBlur("email")}
              label="Email"
              keyboardType="email-address"
              type="emailAddress"
            />
            {formik.touched.email && formik.errors.email ? (
              <Text className="text-red-500 text-xs mt-1 ml-4">
                {formik.errors.email}
              </Text>
            ) : null}
          </View>

          <View>
            <AppInput
              value={formik.values.password}
              onChangeText={(text) => formik.setFieldValue("password", text)}
              onBlur={formik.handleBlur("password")}
              label="Password"
              icon="lock"
              type="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <Text className="text-red-500 text-xs mt-1 ml-4">
                {formik.errors.password}
              </Text>
            ) : null}
          </View>

          <Button
            onPress={formik.handleSubmit}
            className="w-fit mx-auto "
            isLoading={formik.isSubmitting}
            Icon="login"
          >
            Signup
          </Button>

          <View className="flex-row justify-center items-center mt-2 gap-1">
            <Text className="text-center text-sm text-gray-600">
              already have an account?{" "}
            </Text>
            <Link href={"/screens/Login"}>
              <Text className="text-blue-600 font-medium hover:underline">
                login
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({});
