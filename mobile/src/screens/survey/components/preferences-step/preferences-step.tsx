import React from 'react';

import { Button, Input, ScrollView } from '#libs/components/components';
import { useAppForm, useCallback, useFormController } from '#libs/hooks/hooks';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
} from '#packages/survey/survey';
import {
  DEFAULT_SURVEY_PAYLOAD,
  INVALID_ARRAY_INDEX,
  PREFERENCES_CATEGORIES,
  SPLICE_COUNT,
  TEXTAREA_MAX_LENGTH,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants';

import { SurveyCategory } from '../components';
import { styles } from './styles';

type Properties = {
  onSubmit: (options: string[]) => void;
};

const PreferencesStep: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, isValid, handleSubmit } = useAppForm<SurveyInputDto>(
    {
      defaultValues: DEFAULT_SURVEY_PAYLOAD,
      validationSchema: surveyInputValidationSchema,
    },
  );
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'preferences',
    control,
  });
  const hasOther = categoriesValue.includes('Other');

  const handleFieldChange = useCallback(
    (option: string) => {
      const index = categoriesValue.indexOf(option);

      if (index === INVALID_ARRAY_INDEX) {
        onCategoryChange([...categoriesValue, option]);

        return;
      }

      categoriesValue.splice(index, SPLICE_COUNT);
      onCategoryChange(categoriesValue);
    },
    [categoriesValue, onCategoryChange],
  );

  const handleSurveySubmit = useCallback(
    (payload: SurveyInputDto) => {
      onSubmit(getSurveyCategories(payload));
    },
    [onSubmit],
  );

  const handleFormSubmit = useCallback((): void => {
    void handleSubmit(handleSurveySubmit)();
  }, [handleSubmit, handleSurveySubmit]);

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      {PREFERENCES_CATEGORIES.map((category) => (
        <SurveyCategory
          key={category}
          onChange={handleFieldChange}
          label={category}
        />
      ))}

      {hasOther && (
        <Input
          control={control}
          errors={errors}
          name="other"
          placeholder="Enter your preferences"
          maxLength={TEXTAREA_MAX_LENGTH}
          rowsCount={TEXTAREA_ROWS_COUNT}
        />
      )}
      <Button
        label="Continue"
        onPress={handleFormSubmit}
        isDisabled={!isValid}
        type="outlined"
      />
    </ScrollView>
  );
};

export { PreferencesStep };
