/**
* 工具库函数
*/
import bomCtrl from './bomCtrl';
import dataManipulate from './dataManipulate';
import dateFormat from './dateFormat';
import regular from './regular';
import url from './url';
import other from './other';
import domCtrl from './domCtrl';

const Library = {
    ...bomCtrl,
    ...dataManipulate,
    ...dateFormat,
    ...regular,
    ...url,
    ...domCtrl,
    ...other,
};

export default Library;
