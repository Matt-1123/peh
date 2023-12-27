/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTravelAction } from "../graphql/mutations";
const client = generateClient();
export default function TravelActionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    title: "",
    description: "",
    usedTravelType: "",
    usedDistance: "",
    avoidedTravelType: "",
    avoidedDistance: "",
    carbonPrevented: "",
    user: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [usedTravelType, setUsedTravelType] = React.useState(
    initialValues.usedTravelType
  );
  const [usedDistance, setUsedDistance] = React.useState(
    initialValues.usedDistance
  );
  const [avoidedTravelType, setAvoidedTravelType] = React.useState(
    initialValues.avoidedTravelType
  );
  const [avoidedDistance, setAvoidedDistance] = React.useState(
    initialValues.avoidedDistance
  );
  const [carbonPrevented, setCarbonPrevented] = React.useState(
    initialValues.carbonPrevented
  );
  const [user, setUser] = React.useState(initialValues.user);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDate(initialValues.date);
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setUsedTravelType(initialValues.usedTravelType);
    setUsedDistance(initialValues.usedDistance);
    setAvoidedTravelType(initialValues.avoidedTravelType);
    setAvoidedDistance(initialValues.avoidedDistance);
    setCarbonPrevented(initialValues.carbonPrevented);
    setUser(initialValues.user);
    setErrors({});
  };
  const validations = {
    date: [{ type: "Required" }],
    title: [{ type: "Required" }],
    description: [],
    usedTravelType: [{ type: "Required" }],
    usedDistance: [{ type: "Required" }],
    avoidedTravelType: [{ type: "Required" }],
    avoidedDistance: [{ type: "Required" }],
    carbonPrevented: [{ type: "Required" }],
    user: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          date,
          title,
          description,
          usedTravelType,
          usedDistance,
          avoidedTravelType,
          avoidedDistance,
          carbonPrevented,
          user,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createTravelAction.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TravelActionCreateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              title,
              description,
              usedTravelType,
              usedDistance,
              avoidedTravelType,
              avoidedDistance,
              carbonPrevented,
              user,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              title: value,
              description,
              usedTravelType,
              usedDistance,
              avoidedTravelType,
              avoidedDistance,
              carbonPrevented,
              user,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              title,
              description: value,
              usedTravelType,
              usedDistance,
              avoidedTravelType,
              avoidedDistance,
              carbonPrevented,
              user,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Used travel type"
        isRequired={true}
        isReadOnly={false}
        value={usedTravelType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              title,
              description,
              usedTravelType: value,
              usedDistance,
              avoidedTravelType,
              avoidedDistance,
              carbonPrevented,
              user,
            };
            const result = onChange(modelFields);
            value = result?.usedTravelType ?? value;
          }
          if (errors.usedTravelType?.hasError) {
            runValidationTasks("usedTravelType", value);
          }
          setUsedTravelType(value);
        }}
        onBlur={() => runValidationTasks("usedTravelType", usedTravelType)}
        errorMessage={errors.usedTravelType?.errorMessage}
        hasError={errors.usedTravelType?.hasError}
        {...getOverrideProps(overrides, "usedTravelType")}
      ></TextField>
      <TextField
        label="Used distance"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={usedDistance}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              title,
              description,
              usedTravelType,
              usedDistance: value,
              avoidedTravelType,
              avoidedDistance,
              carbonPrevented,
              user,
            };
            const result = onChange(modelFields);
            value = result?.usedDistance ?? value;
          }
          if (errors.usedDistance?.hasError) {
            runValidationTasks("usedDistance", value);
          }
          setUsedDistance(value);
        }}
        onBlur={() => runValidationTasks("usedDistance", usedDistance)}
        errorMessage={errors.usedDistance?.errorMessage}
        hasError={errors.usedDistance?.hasError}
        {...getOverrideProps(overrides, "usedDistance")}
      ></TextField>
      <TextField
        label="Avoided travel type"
        isRequired={true}
        isReadOnly={false}
        value={avoidedTravelType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              title,
              description,
              usedTravelType,
              usedDistance,
              avoidedTravelType: value,
              avoidedDistance,
              carbonPrevented,
              user,
            };
            const result = onChange(modelFields);
            value = result?.avoidedTravelType ?? value;
          }
          if (errors.avoidedTravelType?.hasError) {
            runValidationTasks("avoidedTravelType", value);
          }
          setAvoidedTravelType(value);
        }}
        onBlur={() =>
          runValidationTasks("avoidedTravelType", avoidedTravelType)
        }
        errorMessage={errors.avoidedTravelType?.errorMessage}
        hasError={errors.avoidedTravelType?.hasError}
        {...getOverrideProps(overrides, "avoidedTravelType")}
      ></TextField>
      <TextField
        label="Avoided distance"
        isRequired={true}
        isReadOnly={false}
        value={avoidedDistance}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              title,
              description,
              usedTravelType,
              usedDistance,
              avoidedTravelType,
              avoidedDistance: value,
              carbonPrevented,
              user,
            };
            const result = onChange(modelFields);
            value = result?.avoidedDistance ?? value;
          }
          if (errors.avoidedDistance?.hasError) {
            runValidationTasks("avoidedDistance", value);
          }
          setAvoidedDistance(value);
        }}
        onBlur={() => runValidationTasks("avoidedDistance", avoidedDistance)}
        errorMessage={errors.avoidedDistance?.errorMessage}
        hasError={errors.avoidedDistance?.hasError}
        {...getOverrideProps(overrides, "avoidedDistance")}
      ></TextField>
      <TextField
        label="Carbon prevented"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={carbonPrevented}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              title,
              description,
              usedTravelType,
              usedDistance,
              avoidedTravelType,
              avoidedDistance,
              carbonPrevented: value,
              user,
            };
            const result = onChange(modelFields);
            value = result?.carbonPrevented ?? value;
          }
          if (errors.carbonPrevented?.hasError) {
            runValidationTasks("carbonPrevented", value);
          }
          setCarbonPrevented(value);
        }}
        onBlur={() => runValidationTasks("carbonPrevented", carbonPrevented)}
        errorMessage={errors.carbonPrevented?.errorMessage}
        hasError={errors.carbonPrevented?.hasError}
        {...getOverrideProps(overrides, "carbonPrevented")}
      ></TextField>
      <TextField
        label="User"
        isRequired={true}
        isReadOnly={false}
        value={user}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              title,
              description,
              usedTravelType,
              usedDistance,
              avoidedTravelType,
              avoidedDistance,
              carbonPrevented,
              user: value,
            };
            const result = onChange(modelFields);
            value = result?.user ?? value;
          }
          if (errors.user?.hasError) {
            runValidationTasks("user", value);
          }
          setUser(value);
        }}
        onBlur={() => runValidationTasks("user", user)}
        errorMessage={errors.user?.errorMessage}
        hasError={errors.user?.hasError}
        {...getOverrideProps(overrides, "user")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
