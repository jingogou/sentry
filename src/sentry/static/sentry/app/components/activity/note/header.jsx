import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

import {t} from 'app/locale';
import ActivityAuthor from 'app/components/activity/author';
import ConfigStore from 'app/stores/configStore';
import LinkWithConfirmation from 'app/components/links/linkWithConfirmation';
import SentryTypes from 'app/sentryTypes';

import EditorTools from './editorTools';

class NoteHeader extends React.Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
    user: SentryTypes.User,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  canEdit = () => {
    const user = ConfigStore.get('user');
    return user && (user.isSuperuser || user.id === this.props.user.id);
  };

  render() {
    const {author, onEdit, onDelete} = this.props;

    return (
      <div>
        <ActivityAuthor>{author.name}</ActivityAuthor>
        {this.canEdit() && (
          <EditorTools>
            <Edit onClick={onEdit}>{t('Edit')}</Edit>
            <LinkWithConfirmation
              title={t('Remove')}
              message={t('Are you sure you wish to delete this comment?')}
              onConfirm={onDelete}
            >
              <Remove>{t('Remove')}</Remove>
            </LinkWithConfirmation>
          </EditorTools>
        )}
      </div>
    );
  }
}

const EditorAction = styled('a')`
  padding: 0 7px;
  color: ${p => p.theme.gray1};
  font-weight: normal;
`;

const Edit = styled(EditorAction)`
  margin-left: 7px;

  &:hover {
    color: ${p => p.theme.gray2};
  }
`;

const Remove = styled(EditorAction)`
  border-left: 1px solid ${p => p.theme.borderLight};

  &:hover {
    color: ${p => p.theme.error};
  }
`;

export default NoteHeader;
