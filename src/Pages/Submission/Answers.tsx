import React, {FC, useCallback} from 'react';
import {VirtualizedList} from 'react-native';

import {SubmissionCard} from '../../components/';

interface IAnswerProps {
  submissions: any;
  navigation: any;
  sheetModalRef: any;
  selectSubmission: (id: string, answer: any) => void;
}

const Answer: FC<IAnswerProps> = ({
  submissions,
  navigation,
  sheetModalRef,
  selectSubmission,
}) => {
  const handleOpen = useCallback(
    (id: string, answer: any) => {
      selectSubmission(id, answer);
      sheetModalRef.current?.present();
    },
    [selectSubmission, sheetModalRef],
  );

  return (
    <VirtualizedList
      data={submissions}
      initialNumToRender={7}
      getItem={(data: any, index: number) => ({
        item: data[index],
      })}
      getItemCount={data => data.length}
      keyExtractor={item => item.item.id}
      renderItem={({item}) => (
        <SubmissionCard
          item={item}
          navigation={navigation}
          onPress={handleOpen}
        />
      )}
    />
  );
};

export default Answer;
