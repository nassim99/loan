import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import Text from 'components/app-text';
import { Column } from 'components/grid';
import Loading from 'components/loading';
import Separator from 'components/separator';
import ScrollView from 'components/scrollview';

import Lang from 'local/lang';
import { convertDate } from 'helpers/date';
import { GREEN, LightGray2 } from 'styles/colors';

type RootStackParamList = {
  AccountRepaiement: {
    accountId: string;
    accountNumber: string;
  };
};
interface AccountRepaiementScreenProps {
  route: RouteProp<RootStackParamList, 'AccountRepaiement'>;
}

const AccountRepaiementsScreen: React.FC<AccountRepaiementScreenProps> = ({ route }) => {
  const [fetchedData, setFetchedData] = React.useState<Array<any>>([]);

  const { accountId, accountNumber } = route.params;

  React.useEffect(() => {
    const historyLink = `https://api.cfc-kw.com/customers/${accountId}/loans/${accountNumber}/history`;
    fetch(historyLink)
      .then(res => res.json())
      .then(res2 => {
        setFetchedData(res2.data.repayment);
      })
      .catch(e => {
        Alert.alert('some error happens');
      });
  }, []);

  return (
    <Column style={styles.container}>
      {fetchedData.length === 0 ? (
        <Loading />
      ) : (
        <ScrollView style={styles.scrollStyle}>
          {fetchedData.map((item, i) => (
            <Column key={i} isScreen>
              <Text color={LightGray2}>{Lang.dueDate}</Text>
              <Text color={GREEN} size={16}>
                {convertDate(item.due_date)}
              </Text>
              <Text color={LightGray2} size={16}>
                {`${Lang.amount}: ${item.installment_amount}`}
              </Text>
              <Text color={LightGray2} size={16}>
                {`${Lang.receivedAmount}: ${item.received_amount}`}
              </Text>
              <Text color={LightGray2} size={16}>
                {`${Lang.installmentNumber}: ${item.number}`}
              </Text>
              {i != fetchedData.length - 1 && <Separator type="full" />}
            </Column>
          ))}
        </ScrollView>
      )}
    </Column>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollStyle: {
    width: '100%',
  },
});

export default AccountRepaiementsScreen;
