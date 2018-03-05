import * as React from "react";
import { Button } from "antd";
import * as styles from "./index.css";

interface EditableLinkGroupProps {
  links: LinkObj[];
  onAdd: () => {};
  linkElement: string;
}

interface LinkObj {
  id: number;
  title: string;
  href: string;
}

// TODO: Add logic

class EditableLinkGroup extends React.PureComponent<EditableLinkGroupProps> {
  render() {
    const { links, linkElement, onAdd } = this.props;
    return (
      <div className={styles.linkGroup}>
        {links.map(link =>
          React.createElement(
            linkElement,
            {
              key: `linkGroup-item-${link.id || link.title}`,
              to: link.href,
              href: link.href
            },
            link.title
          )
        )}
        {
          <Button size="small" type="primary" ghost onClick={onAdd} icon="plus">
            Add
          </Button>
        }
      </div>
    );
  }
}

export default EditableLinkGroup;
