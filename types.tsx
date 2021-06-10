/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  EditAccounts: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  WholeTab: undefined;
};

export type HomeTabParamList = {
  HomeTabScreen: undefined;
};

export type EditAccountsParamList = {
  EditAccountsScreen: undefined;
};

export type WholeTabParamList = {
  WholeTabScreen: undefined;
};

export type Account = {
  avatar: string;
  name: string;
  balance: number;
}
