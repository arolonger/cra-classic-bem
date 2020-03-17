/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const loaderUtils = require('loader-utils');
const path = require('path'); 

module.exports = function getLocalIdent(
    context,
    localIdentName,
    localName,
    options
) {
    // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
    const hash = loaderUtils.getHashDigest(
        path.posix.relative(context.rootContext, context.resourcePath) + localName,
        'md5',
        'base64',
        5
    );

    // Use loaderUtils to find the file or folder name
    const className = loaderUtils.interpolateName(
        context,
        `${localName}__${hash}`,
        options
    );

    // remove the .module that appears in every classname when based on the file.
    return className.replace('.module_', '_');
};
