import React from 'react';
import MyDrawer from '../components/myDrawer';
import { Button } from '@material-ui/core';
import { connect } from '../database/main';
import { TagEntity } from '../database/entity/tag.entity';

export default function Sponsorship(): JSX.Element {
  return (
    <MyDrawer className="">
      <Button
        onClick={async () => {
          const database = await connect;
          const userEntityRepository = database.getRepository(TagEntity);
          const oldUser = new TagEntity();
          oldUser.tagName = 'sushao';
          const user = await userEntityRepository.save(oldUser);
          console.log(user);
        }}
      >
        add
      </Button>
    </MyDrawer>
  );
}
