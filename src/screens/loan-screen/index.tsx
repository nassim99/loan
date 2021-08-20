import React from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Bullet from 'components/bullet';
import Text from 'components/app-text';
import Loading from 'components/loading';
import Section from 'components/section';
import Separator from 'components/separator';
import { Column, Row } from 'components/grid';
import ScrollView from 'components/scrollview';
import HeaderItem from 'components/header-item';

import Lang from 'local/lang';
import { BLACK, LightBlue, LightGray, Red } from 'styles/colors';

import GaugeSVG from '@nassim99/react-native-gauge';

const WINDOW_WIDTH = Dimensions.get('window').width;

const loansLink = 'https://api.cfc-kw.com/customers/584657/loans';

type RootStackParamList = {
  AccountRepaiement: {
    accountId: string;
    accountNumber: string;
  };
};
interface LoanScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}
const LoanScreen: React.FC<LoanScreenProps> = ({ navigation }) => {
  const [loans, setLoans] = React.useState<Array<any>>([]);
  const [selectedPage, setSelectedPage] = React.useState<number>(0);

  React.useEffect(() => {
    if (loans.length === 0) {
      getLoans();
    }
  }, []);

  const getLoans: () => void = () => {
    fetch(loansLink)
      .then(res => res.json())
      .then(data => {
        setLoans(data.data);
        setScreenTitle(0, data.data);
      })
      .catch(e => {
        Alert.alert('error getting data');
        console.log(e);
      });
  };

  const handleMomentumScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / WINDOW_WIDTH);
    setScreenTitle(page);
    setSelectedPage(page);
  };

  const setScreenTitle = (page: number, data?: any) => {
    navigation.setOptions({
      title: !!data ? data[page].account_no : loans[page].account_no,
    });
  };

  const renderPage = React.useMemo(
    () => (
      <ScrollView
        contentContainerStyle={{
          width: WINDOW_WIDTH * loans.length,
        }}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleMomentumScroll}>
        {loans.map((item, i) => (
          <Column style={styles.loansContainer} key={i}>
            <Row style={styles.headerContainer}>
              <HeaderItem title={Lang.loanAmount} value={item.total_loan_amount} />
              <HeaderItem title={Lang.loanAmount} value={item.installment_amount} centerBorder />
              <HeaderItem title={Lang.tenure} value={item.tenure} />
            </Row>
            <Column>
              <Column
                style={styles.gaugeContainer}
                onPress={() =>
                  navigation.navigate('AccountRepaiement', {
                    accountId: item.customer_id,
                    accountNumber: item.account_no,
                  })
                }>
                <GaugeSVG
                  size={WINDOW_WIDTH / 1.5}
                  insideTextColor={'purple'}
                  gaugeColor={BLACK}
                  gaugeValueColor={LightBlue}
                  gaugeStroke={3}
                  gaugeValueStroke={3}
                  insideComponent={
                    <Column style={styles.gaugeContentContainer}>
                      <Text>{Lang.remainingAmount}</Text>
                      <Text size={18} bold>
                        {item.present_balance}
                      </Text>
                      <Column style={styles.textStatus} />
                      <Text size={14} color={Red} bold>
                        {item.status === 'A' ? Lang.active : Lang.closed}
                      </Text>
                    </Column>
                  }
                  value={(item.present_balance / item.total_loan_amount) * 100}
                />
              </Column>
              <Text style={styles.staffCash} size={20}>
                {Lang.staffCash}
              </Text>
              <Separator type="full" />

              <Section title={Lang.monthsTillMaturity} value={'0'} />
              <Section
                title={Lang.dueAmount}
                value={item.amount_due}
                showBottomSeparator={false}
                showPay
              />
            </Column>
          </Column>
        ))}
      </ScrollView>
    ),
    [loans],
  );

  return (
    <Column style={styles.container}>
      {loans.length === 0 ? (
        <Loading />
      ) : (
        <>
          {renderPage}
          <Row style={styles.bulletContainer}>
            {loans.map((item, i) => (
              <Bullet key={i} selected={i === selectedPage} />
            ))}
          </Row>
        </>
      )}
    </Column>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: WINDOW_WIDTH,
  },
  headerContainer: {
    width: WINDOW_WIDTH,
    height: 150,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: LightGray,
  },
  loansContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },

  gaugeContainer: {
    alignSelf: 'center',
    // width: WINDOW_WIDTH / ,
  },
  gaugeContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textStatus: {
    borderRadius: 10,
    height: 3,
    width: '20%',
    backgroundColor: LightBlue,
    marginVertical: 10,
  },
  staffCash: {
    alignSelf: 'center',
  },
  bulletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bulletTextStyle: {
    paddingHorizontal: 5,
  },
});

export default LoanScreen;
