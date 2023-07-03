import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCar } from 'apiSdk/cars';
import { Error } from 'components/error';
import { carValidationSchema } from 'validationSchema/cars';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CarModelInterface } from 'interfaces/car-model';
import { UserInterface } from 'interfaces/user';
import { getCarModels } from 'apiSdk/car-models';
import { getUsers } from 'apiSdk/users';
import { CarInterface } from 'interfaces/car';

function CarCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CarInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCar(values);
      resetForm();
      router.push('/cars');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CarInterface>({
    initialValues: {
      mileage: 0,
      purchase_date: new Date(new Date().toDateString()),
      car_model_id: (router.query.car_model_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: carValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Car
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="mileage" mb="4" isInvalid={!!formik.errors?.mileage}>
            <FormLabel>Mileage</FormLabel>
            <NumberInput
              name="mileage"
              value={formik.values?.mileage}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('mileage', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.mileage && <FormErrorMessage>{formik.errors?.mileage}</FormErrorMessage>}
          </FormControl>
          <FormControl id="purchase_date" mb="4">
            <FormLabel>Purchase Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.purchase_date ? new Date(formik.values?.purchase_date) : null}
                onChange={(value: Date) => formik.setFieldValue('purchase_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<CarModelInterface>
            formik={formik}
            name={'car_model_id'}
            label={'Select Car Model'}
            placeholder={'Select Car Model'}
            fetcher={getCarModels}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'car',
    operation: AccessOperationEnum.CREATE,
  }),
)(CarCreatePage);
