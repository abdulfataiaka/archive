import store from './store';
import Helper from './helper';
import Message from './message';
import TextField from './nodes/textField';

class Parser {
  /**
   *
   *
   * @description To be called on parse page
   *
   * @memberof API
   */
  initialize = () => {
    const self = this;
    let nodeCount = 0;
    let nodeName;
    let groupStr;
    let handler;

    //++ Use normal function to preserve keyword {this}
    $('[modela]').each(function() {
      nodeCount++;
      nodeName = ($(this).attr('name') || '').trim();

      if (!Helper.isNodeName(nodeName)) {
        Helper.stdout(Message.get(2, {
          name: nodeName,
          index: nodeCount
        })); return true;
      }

      // Lets check the handler for node
      handler = self.getHandle($(this), nodeName);

      if (!handler) {
        Helper.stdout(Message.get(4, {
          name: nodeName, index: nodeCount
        })); return true;
      }
      
      //++ Lets check the group too
      groupStr = ($(this).attr('modela') || '').trim();

      if (groupStr !== '' && !Helper.isGroupString(groupStr)) {
        Helper.stdout(Message.get(8, {
          group: groupStr, index: nodeCount
        })); return true;
      }

      const groups = self.splitGroups(groupStr);
      const value = handler.getValue();
      store.insert(nodeName, value, handler, groups);
    });
  }

  /**
   *
   * 
   * @description Handle class based on node props
   *
   * @param { Object } element
   * @param { String } modelaId
   * 
   * @returns { Object | null }
   * 
   * @memberof API
   */
  getHandle = (element, nodeName) => {
    if (this.isTextFieldNode(element)) {
      return new TextField(nodeName, element);
    }

    return null;
  }

  /**
   *
   * 
   * @description Check if textfield
   *
   * @param { Object } element
   * 
   * @returns { Boolean }
   * 
   * @memberof API
   */
  isTextFieldNode = (element) => {
    const type = (element.attr('type') || '').toLowerCase();
    const tagname = (element[0].tagName || '').toLowerCase();
    return (tagname === 'input' && type === 'text');
  }

  splitGroups = (groupStr) => {
    return groupStr == ''
      ? []
      : groupStr.split('|');
  }
}

export default Parser;
