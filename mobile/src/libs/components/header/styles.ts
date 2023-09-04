import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppColor.WHITE,
    borderBottomColor: AppColor.GRAY_100,
    borderBottomWidth: 1,
    height: 81,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 31,
  },
  headerCenter: {
    justifyContent: 'center',
  },
  title: {
    color: AppColor.GRAY_500,
    fontSize: 20,
    fontWeight: '600',
    maxWidth: 300,
  },
});

export { styles };