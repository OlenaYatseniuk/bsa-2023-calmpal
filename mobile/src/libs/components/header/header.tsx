import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import {
  Icon,
  IconButton,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';
import { AppColor, RootScreenName } from '#libs/enums/enums';
import { useAppRoute, useNavigation } from '#libs/hooks/hooks';
import { type RootNavigationParameterList } from '#libs/types/types';

import { Badge } from './components/components';
import { DEFAULT_BADGE_COUNT } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title?: string;
  isArrowVisible?: boolean;
  badgeCount?: number;
  isProfileVisible?: boolean;
};

const Header: React.FC<Properties> = ({
  title,
  isArrowVisible = false,
  badgeCount = DEFAULT_BADGE_COUNT,
  isProfileVisible = false,
}) => {
  const navigation =
    useNavigation<NavigationProp<RootNavigationParameterList>>();
  const { name } = useAppRoute();

  const hasValue = Boolean(badgeCount);

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleIconPress = (): void => {
    navigation.navigate(RootScreenName.MY_PROFILE);
  };

  return (
    <View
      style={[
        styles.header,
        isArrowVisible && styles.headerCenter,
        isProfileVisible && styles.settings,
      ]}
    >
      {isArrowVisible && (
        <TouchableOpacity style={styles.arrow} onPress={handleGoBack}>
          <Icon name="back-arrow" color={AppColor.BLUE_200} />
        </TouchableOpacity>
      )}
      <View style={styles.titleBadgeContainer}>
        <Text style={styles.title}>{title ?? name}</Text>
        {hasValue && <Badge count={badgeCount} />}
      </View>
      {isProfileVisible && (
        <View style={styles.settingsContainer}>
          <IconButton
            onPress={handleIconPress}
            color={AppColor.BLUE_300}
            iconName="user"
          />
        </View>
      )}
    </View>
  );
};

export { Header };
