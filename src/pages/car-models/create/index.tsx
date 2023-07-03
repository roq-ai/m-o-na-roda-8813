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
import { createCarModel } from 'apiSdk/car-models';
import { Error } from 'components/error';
import { carModelValidationSchema } from 'validationSchema/car-models';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CarMakerInterface } from 'interfaces/car-maker';
import { UserInterface } from 'interfaces/user';
import { getCarMakers } from 'apiSdk/car-makers';
import { getUsers } from 'apiSdk/users';
import { CarModelInterface } from 'interfaces/car-model';

function CarModelCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CarModelInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCarModel(values);
      resetForm();
      router.push('/car-models');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CarModelInterface>({
    initialValues: {
      name: '',
      year: 0,
      car_maker_id: (router.query.car_maker_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: carModelValidationSchema,
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
            Create Car Model
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="year" mb="4" isInvalid={!!formik.errors?.year}>
            <FormLabel>Year</FormLabel>
            <NumberInput
              name="year"
              value={formik.values?.year}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('year', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.year && <FormErrorMessage>{formik.errors?.year}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CarMakerInterface>
            formik={formik}
            name={'car_maker_id'}
            label={'Select Car Maker'}
            placeholder={'Select Car Maker'}
            fetcher={getCarMakers}
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
    entity: 'car_model',
    operation: AccessOperationEnum.CREATE,
  }),
)(CarModelCreatePage);
