import React from 'react';
import { Alert, StyleSheet } from 'react-native';

import Text from 'components/app-text';
import Separator from 'components/separator';
import { Column, Row } from 'components/grid';

import Lang from 'local/lang';
import { LightBlue2, LightGray2, WHITE } from 'styles/colors';

interface SectionProps {
  title: string;
  value: string;
  showPay?: boolean;
  showBottomSeparator?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  value,
  showPay = false,
  showBottomSeparator = true,
}) => {
  const SectionComponent = showPay ? Row : Column;
  return (
    <>
      <SectionComponent style={styles.section}>
        <Column>
          <Text size={20}>{title}</Text>
          <Text size={20} color={LightGray2}>
            {value}
          </Text>
        </Column>
        {showPay && (
          <Column onPress={() => Alert.alert('Pay')}>
            <Text style={styles.textPay} color={WHITE}>
              {Lang.pay}
            </Text>
          </Column>
        )}
      </SectionComponent>

      {showBottomSeparator && <Separator type="full" />}
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 30,
  },
  textPay: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: LightBlue2,
    borderRadius: 10,
  },
});

export default Section;
