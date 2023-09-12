import { Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.helper.js';
import { type ChatMessage } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  item: ChatMessage;
  isSender: boolean;
};

const ChatMessage: React.FC<Properties> = ({ item, isSender }) => {
  return (
    <div
      className={getValidClassNames(
        styles['message-container'],
        isSender && styles['user-message-container'],
      )}
    >
      {!isSender && (
        <div className={styles['avatar']}>
          <Icon name="chatbot-avatar" color={IconColor.BLUE} />
        </div>
      )}
      <div
        className={getValidClassNames(
          styles['message-content'],
          isSender && styles['user-message-content'],
        )}
      >
        {item.messages.map(({ message, id }) => {
          return (
            <p
              key={id}
              className={getValidClassNames(
                styles['message-item'],
                isSender && styles['user-message-item'],
                !isSender && styles['bot-message-item'],
              )}
            >
              {message}
            </p>
          );
        })}
      </div>
      {isSender && (
        <div
          className={getValidClassNames(
            styles['avatar'],
            styles['user-avatar'],
          )}
        />
      )}
    </div>
  );
};

export { ChatMessage };
