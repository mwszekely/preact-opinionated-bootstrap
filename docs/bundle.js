(function () {
  'use strict';

  var EMPTY_OBJ$1 = {};
  var EMPTY_ARR$1 = [];
  var IS_NON_DIMENSIONAL$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  /**
   * Assign properties from `props` to `obj`
   * @template O, P The obj and props types
   * @param {O} obj The object to copy properties to
   * @param {P} props The object to copy properties from
   * @returns {O & P}
   */

  function assign$3(obj, props) {
    // @ts-ignore We change the type of `obj` to be `O & P`
    for (var i in props) {
      obj[i] = props[i];
    }

    return (
      /** @type {O & P} */
      obj
    );
  }
  /**
   * Remove a child node from its parent if attached. This is a workaround for
   * IE11 which doesn't support `Element.prototype.remove()`. Using this function
   * is smaller than including a dedicated polyfill.
   * @param {Node} node The node to remove
   */


  function removeNode$1(node) {
    var parentNode = node.parentNode;

    if (parentNode) {
      parentNode.removeChild(node);
    }
  }

  var slice$1 = EMPTY_ARR$1.slice;
  /**
   * Find the closest error boundary to a thrown error and call it
   * @param {object} error The thrown value
   * @param {import('../internal').VNode} vnode The vnode that threw
   * the error that was caught (except for unmounting when this parameter
   * is the highest parent that was being unmounted)
   */

  function _catchError$1(error, vnode) {
    /** @type {import('../internal').Component} */
    var component, ctor, handled;

    for (; vnode = vnode._parent;) {
      if ((component = vnode._component) && !component._processingException) {
        try {
          ctor = component.constructor;

          if (ctor && ctor.getDerivedStateFromError != null) {
            component.setState(ctor.getDerivedStateFromError(error));
            handled = component._dirty;
          }

          if (component.componentDidCatch != null) {
            component.componentDidCatch(error);
            handled = component._dirty;
          } // This is an error boundary. Mark it as having bailed out, and whether it was mid-hydration.


          if (handled) {
            return component._pendingError = component;
          }
        } catch (e) {
          error = e;
        }
      }
    }

    throw error;
  }
  /**
   * The `option` object can potentially contain callback functions
   * that are called during various stages of our renderer. This is the
   * foundation on which all our addons like `preact/debug`, `preact/compat`,
   * and `preact/hooks` are based on. See the `Options` type in `internal.d.ts`
   * for a full list of available option hooks (most editors/IDEs allow you to
   * ctrl+click or cmd+click on mac the type definition below).
   * @type {import('./internal').Options}
   */


  var options$1 = {
    _catchError: _catchError$1
  };
  var vnodeId$1 = 0;
  /**
   * Create an virtual node (used for JSX)
   * @param {import('./internal').VNode["type"]} type The node name or Component
   * constructor for this virtual node
   * @param {object | null | undefined} [props] The properties of the virtual node
   * @param {Array<import('.').ComponentChildren>} [children] The children of the virtual node
   * @returns {import('./internal').VNode}
   */

  function createElement$1(type, props, children) {
    var normalizedProps = {},
        key,
        ref,
        i;

    for (i in props) {
      if (i == 'key') {
        key = props[i];
      } else if (i == 'ref') {
        ref = props[i];
      } else {
        normalizedProps[i] = props[i];
      }
    }

    if (arguments.length > 2) {
      normalizedProps.children = arguments.length > 3 ? slice$1.call(arguments, 2) : children;
    } // If a Component VNode, check for and apply defaultProps
    // Note: type may be undefined in development, must never error here.


    if (typeof type == 'function' && type.defaultProps != null) {
      for (i in type.defaultProps) {
        if (normalizedProps[i] === undefined) {
          normalizedProps[i] = type.defaultProps[i];
        }
      }
    }

    return createVNode$1(type, normalizedProps, key, ref, null);
  }
  /**
   * Create a VNode (used internally by Preact)
   * @param {import('./internal').VNode["type"]} type The node name or Component
   * Constructor for this virtual node
   * @param {object | string | number | null} props The properties of this virtual node.
   * If this virtual node represents a text node, this is the text of the node (string or number).
   * @param {string | number | null} key The key for this virtual node, used when
   * diffing it against its children
   * @param {import('./internal').VNode["ref"]} ref The ref property that will
   * receive a reference to its created child
   * @returns {import('./internal').VNode}
   */


  function createVNode$1(type, props, key, ref, original) {
    // V8 seems to be better at detecting type shapes if the object is allocated from the same call site
    // Do not inline into createElement and coerceToVNode!
    var vnode = {
      type: type,
      props: props,
      key: key,
      ref: ref,
      _children: null,
      _parent: null,
      _depth: 0,
      _dom: null,
      // _nextDom must be initialized to undefined b/c it will eventually
      // be set to dom.nextSibling which can return `null` and it is important
      // to be able to distinguish between an uninitialized _nextDom and
      // a _nextDom that has been set to `null`
      _nextDom: undefined,
      _component: null,
      _hydrating: null,
      constructor: undefined,
      _original: original == null ? ++vnodeId$1 : original
    }; // Only invoke the vnode hook if this was *not* a direct copy:

    if (original == null && options$1.vnode != null) {
      options$1.vnode(vnode);
    }

    return vnode;
  }

  function createRef() {
    return {
      current: null
    };
  }

  function Fragment$1(props) {
    return props.children;
  }
  /**
   * Check if a the argument is a valid Preact VNode.
   * @param {*} vnode
   * @returns {vnode is import('./internal').VNode}
   */


  var isValidElement = function isValidElement(vnode) {
    return vnode != null && vnode.constructor === undefined;
  };
  /**
   * Base Component class. Provides `setState()` and `forceUpdate()`, which
   * trigger rendering
   * @param {object} props The initial component props
   * @param {object} context The initial context from parent components'
   * getChildContext
   */


  function Component$2(props, context) {
    this.props = props;
    this.context = context;
  }
  /**
   * Update component state and schedule a re-render.
   * @this {import('./internal').Component}
   * @param {object | ((s: object, p: object) => object)} update A hash of state
   * properties to update with new values or a function that given the current
   * state and props returns a new partial state
   * @param {() => void} [callback] A function to be called once component state is
   * updated
   */


  Component$2.prototype.setState = function (update, callback) {
    // only clone state when copying to nextState the first time.
    var s;

    if (this._nextState != null && this._nextState !== this.state) {
      s = this._nextState;
    } else {
      s = this._nextState = assign$3({}, this.state);
    }

    if (typeof update == 'function') {
      // Some libraries like `immer` mark the current state as readonly,
      // preventing us from mutating it, so we need to clone it. See #2716
      update = update(assign$3({}, s), this.props);
    }

    if (update) {
      assign$3(s, update);
    } // Skip update if updater function returned null


    if (update == null) {
      return;
    }

    if (this._vnode) {
      if (callback) {
        this._renderCallbacks.push(callback);
      }

      enqueueRender$1(this);
    }
  };
  /**
   * Immediately perform a synchronous re-render of the component
   * @this {import('./internal').Component}
   * @param {() => void} [callback] A function to be called after component is
   * re-rendered
   */


  Component$2.prototype.forceUpdate = function (callback) {
    if (this._vnode) {
      // Set render mode so that we can differentiate where the render request
      // is coming from. We need this because forceUpdate should never call
      // shouldComponentUpdate
      this._force = true;

      if (callback) {
        this._renderCallbacks.push(callback);
      }

      enqueueRender$1(this);
    }
  };
  /**
   * Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
   * Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
   * @param {object} props Props (eg: JSX attributes) received from parent
   * element/component
   * @param {object} state The component's current state
   * @param {object} context Context object, as returned by the nearest
   * ancestor's `getChildContext()`
   * @returns {import('./index').ComponentChildren | void}
   */


  Component$2.prototype.render = Fragment$1;
  /**
   * @param {import('./internal').VNode} vnode
   * @param {number | null} [childIndex]
   */

  function getDomSibling$1(vnode, childIndex) {
    if (childIndex == null) {
      // Use childIndex==null as a signal to resume the search from the vnode's sibling
      return vnode._parent ? getDomSibling$1(vnode._parent, vnode._parent._children.indexOf(vnode) + 1) : null;
    }

    var sibling;

    for (; childIndex < vnode._children.length; childIndex++) {
      sibling = vnode._children[childIndex];

      if (sibling != null && sibling._dom != null) {
        // Since updateParentDomPointers keeps _dom pointer correct,
        // we can rely on _dom to tell us if this subtree contains a
        // rendered DOM node, and what the first rendered DOM node is
        return sibling._dom;
      }
    } // If we get here, we have not found a DOM node in this vnode's children.
    // We must resume from this vnode's sibling (in it's parent _children array)
    // Only climb up and search the parent if we aren't searching through a DOM
    // VNode (meaning we reached the DOM parent of the original vnode that began
    // the search)


    return typeof vnode.type == 'function' ? getDomSibling$1(vnode) : null;
  }
  /**
   * Trigger in-place re-rendering of a component.
   * @param {import('./internal').Component} component The component to rerender
   */


  function renderComponent$1(component) {
    var vnode = component._vnode,
        oldDom = vnode._dom,
        parentDom = component._parentDom;

    if (parentDom) {
      var commitQueue = [];
      var oldVNode = assign$3({}, vnode);
      oldVNode._original = vnode._original + 1;
      diff$1(parentDom, vnode, oldVNode, component._globalContext, parentDom.ownerSVGElement !== undefined, vnode._hydrating != null ? [oldDom] : null, commitQueue, oldDom == null ? getDomSibling$1(vnode) : oldDom, vnode._hydrating);
      commitRoot$1(commitQueue, vnode);

      if (vnode._dom != oldDom) {
        updateParentDomPointers$1(vnode);
      }
    }
  }
  /**
   * @param {import('./internal').VNode} vnode
   */


  function updateParentDomPointers$1(vnode) {
    if ((vnode = vnode._parent) != null && vnode._component != null) {
      vnode._dom = vnode._component.base = null;

      for (var i = 0; i < vnode._children.length; i++) {
        var child = vnode._children[i];

        if (child != null && child._dom != null) {
          vnode._dom = vnode._component.base = child._dom;
          break;
        }
      }

      return updateParentDomPointers$1(vnode);
    }
  }
  /**
   * The render queue
   * @type {Array<import('./internal').Component>}
   */


  var rerenderQueue$1 = [];
  /**
   * Asynchronously schedule a callback
   * @type {(cb: () => void) => void}
   */

  /* istanbul ignore next */
  // Note the following line isn't tree-shaken by rollup cuz of rollup/rollup#2566

  var defer$1 = typeof Promise == 'function' ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
  /*
   * The value of `Component.debounce` must asynchronously invoke the passed in callback. It is
   * important that contributors to Preact can consistently reason about what calls to `setState`, etc.
   * do, and when their effects will be applied. See the links below for some further reading on designing
   * asynchronous APIs.
   * * [Designing APIs for Asynchrony](https://blog.izs.me/2013/08/designing-apis-for-asynchrony)
   * * [Callbacks synchronous and asynchronous](https://blog.ometer.com/2011/07/24/callbacks-synchronous-and-asynchronous/)
   */

  var prevDebounce$1;
  /**
   * Enqueue a rerender of a component
   * @param {import('./internal').Component} c The component to rerender
   */

  function enqueueRender$1(c) {
    if (!c._dirty && (c._dirty = true) && rerenderQueue$1.push(c) && !process$2._rerenderCount++ || prevDebounce$1 !== options$1.debounceRendering) {
      prevDebounce$1 = options$1.debounceRendering;
      (prevDebounce$1 || defer$1)(process$2);
    }
  }
  /** Flush the render queue by rerendering all queued components */


  function process$2() {
    var queue;

    while (process$2._rerenderCount = rerenderQueue$1.length) {
      queue = rerenderQueue$1.sort(function (a, b) {
        return a._vnode._depth - b._vnode._depth;
      });
      rerenderQueue$1 = []; // Don't update `renderCount` yet. Keep its value non-zero to prevent unnecessary
      // process() calls from getting scheduled while `queue` is still being consumed.

      queue.some(function (c) {
        if (c._dirty) {
          renderComponent$1(c);
        }
      });
    }
  }

  process$2._rerenderCount = 0;
  /**
   * Diff the children of a virtual node
   * @param {import('../internal').PreactElement} parentDom The DOM element whose
   * children are being diffed
   * @param {import('../internal').ComponentChildren[]} renderResult
   * @param {import('../internal').VNode} newParentVNode The new virtual
   * node whose children should be diff'ed against oldParentVNode
   * @param {import('../internal').VNode} oldParentVNode The old virtual
   * node whose children should be diff'ed against newParentVNode
   * @param {object} globalContext The current context object - modified by getChildContext
   * @param {boolean} isSvg Whether or not this DOM node is an SVG node
   * @param {Array<import('../internal').PreactElement>} excessDomChildren
   * @param {Array<import('../internal').Component>} commitQueue List of components
   * which have callbacks to invoke in commitRoot
   * @param {import('../internal').PreactElement} oldDom The current attached DOM
   * element any new dom elements should be placed around. Likely `null` on first
   * render (except when hydrating). Can be a sibling DOM element when diffing
   * Fragments that have siblings. In most cases, it starts out as `oldChildren[0]._dom`.
   * @param {boolean} isHydrating Whether or not we are in hydration
   */

  function diffChildren$1(parentDom, renderResult, newParentVNode, oldParentVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating) {
    var i, j, oldVNode, childVNode, newDom, firstChildDom, refs; // This is a compression of oldParentVNode!=null && oldParentVNode != EMPTY_OBJ && oldParentVNode._children || EMPTY_ARR
    // as EMPTY_OBJ._children should be `undefined`.

    var oldChildren = oldParentVNode && oldParentVNode._children || EMPTY_ARR$1;
    var oldChildrenLength = oldChildren.length;
    newParentVNode._children = [];

    for (i = 0; i < renderResult.length; i++) {
      childVNode = renderResult[i];

      if (childVNode == null || typeof childVNode == 'boolean') {
        childVNode = newParentVNode._children[i] = null;
      } // If this newVNode is being reused (e.g. <div>{reuse}{reuse}</div>) in the same diff,
      // or we are rendering a component (e.g. setState) copy the oldVNodes so it can have
      // it's own DOM & etc. pointers
      else if (typeof childVNode == 'string' || typeof childVNode == 'number' || // eslint-disable-next-line valid-typeof
      typeof childVNode == 'bigint') {
        childVNode = newParentVNode._children[i] = createVNode$1(null, childVNode, null, null, childVNode);
      } else if (Array.isArray(childVNode)) {
        childVNode = newParentVNode._children[i] = createVNode$1(Fragment$1, {
          children: childVNode
        }, null, null, null);
      } else if (childVNode._depth > 0) {
        // VNode is already in use, clone it. This can happen in the following
        // scenario:
        //   const reuse = <div />
        //   <div>{reuse}<span />{reuse}</div>
        childVNode = newParentVNode._children[i] = createVNode$1(childVNode.type, childVNode.props, childVNode.key, null, childVNode._original);
      } else {
        childVNode = newParentVNode._children[i] = childVNode;
      } // Terser removes the `continue` here and wraps the loop body
      // in a `if (childVNode) { ... } condition


      if (childVNode == null) {
        continue;
      }

      childVNode._parent = newParentVNode;
      childVNode._depth = newParentVNode._depth + 1; // Check if we find a corresponding element in oldChildren.
      // If found, delete the array item by setting to `undefined`.
      // We use `undefined`, as `null` is reserved for empty placeholders
      // (holes).

      oldVNode = oldChildren[i];

      if (oldVNode === null || oldVNode && childVNode.key == oldVNode.key && childVNode.type === oldVNode.type) {
        oldChildren[i] = undefined;
      } else {
        // Either oldVNode === undefined or oldChildrenLength > 0,
        // so after this loop oldVNode == null or oldVNode is a valid value.
        for (j = 0; j < oldChildrenLength; j++) {
          oldVNode = oldChildren[j]; // If childVNode is unkeyed, we only match similarly unkeyed nodes, otherwise we match by key.
          // We always match by type (in either case).

          if (oldVNode && childVNode.key == oldVNode.key && childVNode.type === oldVNode.type) {
            oldChildren[j] = undefined;
            break;
          }

          oldVNode = null;
        }
      }

      oldVNode = oldVNode || EMPTY_OBJ$1; // Morph the old element into the new one, but don't append it to the dom yet

      diff$1(parentDom, childVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating);
      newDom = childVNode._dom;

      if ((j = childVNode.ref) && oldVNode.ref != j) {
        if (!refs) {
          refs = [];
        }

        if (oldVNode.ref) {
          refs.push(oldVNode.ref, null, childVNode);
        }

        refs.push(j, childVNode._component || newDom, childVNode);
      }

      if (newDom != null) {
        if (firstChildDom == null) {
          firstChildDom = newDom;
        }

        if (typeof childVNode.type == 'function' && childVNode._children === oldVNode._children) {
          childVNode._nextDom = oldDom = reorderChildren$1(childVNode, oldDom, parentDom);
        } else {
          oldDom = placeChild$1(parentDom, childVNode, oldVNode, oldChildren, newDom, oldDom);
        }

        if (typeof newParentVNode.type == 'function') {
          // Because the newParentVNode is Fragment-like, we need to set it's
          // _nextDom property to the nextSibling of its last child DOM node.
          //
          // `oldDom` contains the correct value here because if the last child
          // is a Fragment-like, then oldDom has already been set to that child's _nextDom.
          // If the last child is a DOM VNode, then oldDom will be set to that DOM
          // node's nextSibling.
          newParentVNode._nextDom = oldDom;
        }
      } else if (oldDom && oldVNode._dom == oldDom && oldDom.parentNode != parentDom) {
        // The above condition is to handle null placeholders. See test in placeholder.test.js:
        // `efficiently replace null placeholders in parent rerenders`
        oldDom = getDomSibling$1(oldVNode);
      }
    }

    newParentVNode._dom = firstChildDom; // Remove remaining oldChildren if there are any.

    for (i = oldChildrenLength; i--;) {
      if (oldChildren[i] != null) {
        if (typeof newParentVNode.type == 'function' && oldChildren[i]._dom != null && oldChildren[i]._dom == newParentVNode._nextDom) {
          // If the newParentVNode.__nextDom points to a dom node that is about to
          // be unmounted, then get the next sibling of that vnode and set
          // _nextDom to it
          newParentVNode._nextDom = getDomSibling$1(oldParentVNode, i + 1);
        }

        unmount$1(oldChildren[i], oldChildren[i]);
      }
    } // Set refs only after unmount


    if (refs) {
      for (i = 0; i < refs.length; i++) {
        applyRef$1(refs[i], refs[++i], refs[++i]);
      }
    }
  }

  function reorderChildren$1(childVNode, oldDom, parentDom) {
    // Note: VNodes in nested suspended trees may be missing _children.
    var c = childVNode._children;
    var tmp = 0;

    for (; c && tmp < c.length; tmp++) {
      var vnode = c[tmp];

      if (vnode) {
        // We typically enter this code path on sCU bailout, where we copy
        // oldVNode._children to newVNode._children. If that is the case, we need
        // to update the old children's _parent pointer to point to the newVNode
        // (childVNode here).
        vnode._parent = childVNode;

        if (typeof vnode.type == 'function') {
          oldDom = reorderChildren$1(vnode, oldDom, parentDom);
        } else {
          oldDom = placeChild$1(parentDom, vnode, vnode, c, vnode._dom, oldDom);
        }
      }
    }

    return oldDom;
  }
  /**
   * Flatten and loop through the children of a virtual node
   * @param {import('../index').ComponentChildren} children The unflattened
   * children of a virtual node
   * @returns {import('../internal').VNode[]}
   */


  function toChildArray$1(children, out) {
    out = out || [];
    if (children == null || typeof children == 'boolean') ;else if (Array.isArray(children)) {
      children.some(function (child) {
        toChildArray$1(child, out);
      });
    } else {
      out.push(children);
    }
    return out;
  }

  function placeChild$1(parentDom, childVNode, oldVNode, oldChildren, newDom, oldDom) {
    var nextDom;

    if (childVNode._nextDom !== undefined) {
      // Only Fragments or components that return Fragment like VNodes will
      // have a non-undefined _nextDom. Continue the diff from the sibling
      // of last DOM child of this child VNode
      nextDom = childVNode._nextDom; // Eagerly cleanup _nextDom. We don't need to persist the value because
      // it is only used by `diffChildren` to determine where to resume the diff after
      // diffing Components and Fragments. Once we store it the nextDOM local var, we
      // can clean up the property

      childVNode._nextDom = undefined;
    } else if (oldVNode == null || newDom != oldDom || newDom.parentNode == null) {
      outer: if (oldDom == null || oldDom.parentNode !== parentDom) {
        parentDom.appendChild(newDom);
        nextDom = null;
      } else {
        // `j<oldChildrenLength; j+=2` is an alternative to `j++<oldChildrenLength/2`
        for (var sibDom = oldDom, j = 0; (sibDom = sibDom.nextSibling) && j < oldChildren.length; j += 2) {
          if (sibDom == newDom) {
            break outer;
          }
        }

        parentDom.insertBefore(newDom, oldDom);
        nextDom = oldDom;
      }
    } // If we have pre-calculated the nextDOM node, use it. Else calculate it now
    // Strictly check for `undefined` here cuz `null` is a valid value of `nextDom`.
    // See more detail in create-element.js:createVNode


    if (nextDom !== undefined) {
      oldDom = nextDom;
    } else {
      oldDom = newDom.nextSibling;
    }

    return oldDom;
  }
  /**
   * Diff the old and new properties of a VNode and apply changes to the DOM node
   * @param {import('../internal').PreactElement} dom The DOM node to apply
   * changes to
   * @param {object} newProps The new props
   * @param {object} oldProps The old props
   * @param {boolean} isSvg Whether or not this node is an SVG node
   * @param {boolean} hydrate Whether or not we are in hydration mode
   */


  function diffProps$1(dom, newProps, oldProps, isSvg, hydrate) {
    var i;

    for (i in oldProps) {
      if (i !== 'children' && i !== 'key' && !(i in newProps)) {
        setProperty$1(dom, i, null, oldProps[i], isSvg);
      }
    }

    for (i in newProps) {
      if ((!hydrate || typeof newProps[i] == 'function') && i !== 'children' && i !== 'key' && i !== 'value' && i !== 'checked' && oldProps[i] !== newProps[i]) {
        setProperty$1(dom, i, newProps[i], oldProps[i], isSvg);
      }
    }
  }

  function setStyle$1(style, key, value) {
    if (key[0] === '-') {
      style.setProperty(key, value);
    } else if (value == null) {
      style[key] = '';
    } else if (typeof value != 'number' || IS_NON_DIMENSIONAL$1.test(key)) {
      style[key] = value;
    } else {
      style[key] = value + 'px';
    }
  }
  /**
   * Set a property value on a DOM node
   * @param {import('../internal').PreactElement} dom The DOM node to modify
   * @param {string} name The name of the property to set
   * @param {*} value The value to set the property to
   * @param {*} oldValue The old value the property had
   * @param {boolean} isSvg Whether or not this DOM node is an SVG node or not
   */


  function setProperty$1(dom, name, value, oldValue, isSvg) {
    var useCapture;

    o: if (name === 'style') {
      if (typeof value == 'string') {
        dom.style.cssText = value;
      } else {
        if (typeof oldValue == 'string') {
          dom.style.cssText = oldValue = '';
        }

        if (oldValue) {
          for (name in oldValue) {
            if (!(value && name in value)) {
              setStyle$1(dom.style, name, '');
            }
          }
        }

        if (value) {
          for (name in value) {
            if (!oldValue || value[name] !== oldValue[name]) {
              setStyle$1(dom.style, name, value[name]);
            }
          }
        }
      }
    } // Benchmark for comparison: https://esbench.com/bench/574c954bdb965b9a00965ac6
    else if (name[0] === 'o' && name[1] === 'n') {
      useCapture = name !== (name = name.replace(/Capture$/, '')); // Infer correct casing for DOM built-in events:

      if (name.toLowerCase() in dom) {
        name = name.toLowerCase().slice(2);
      } else {
        name = name.slice(2);
      }

      if (!dom._listeners) {
        dom._listeners = {};
      }

      dom._listeners[name + useCapture] = value;

      if (value) {
        if (!oldValue) {
          var handler = useCapture ? eventProxyCapture$1 : eventProxy$1;
          dom.addEventListener(name, handler, useCapture);
        }
      } else {
        var _handler = useCapture ? eventProxyCapture$1 : eventProxy$1;

        dom.removeEventListener(name, _handler, useCapture);
      }
    } else if (name !== 'dangerouslySetInnerHTML') {
      if (isSvg) {
        // Normalize incorrect prop usage for SVG:
        // - xlink:href / xlinkHref --> href (xlink:href was removed from SVG and isn't needed)
        // - className --> class
        name = name.replace(/xlink[H:h]/, 'h').replace(/sName$/, 's');
      } else if (name !== 'href' && name !== 'list' && name !== 'form' && // Default value in browsers is `-1` and an empty string is
      // cast to `0` instead
      name !== 'tabIndex' && name !== 'download' && name in dom) {
        try {
          dom[name] = value == null ? '' : value; // labelled break is 1b smaller here than a return statement (sorry)

          break o;
        } catch (e) {}
      } // ARIA-attributes have a different notion of boolean values.
      // The value `false` is different from the attribute not
      // existing on the DOM, so we can't remove it. For non-boolean
      // ARIA-attributes we could treat false as a removal, but the
      // amount of exceptions would cost us too many bytes. On top of
      // that other VDOM frameworks also always stringify `false`.


      if (typeof value === 'function') ;else if (value != null && (value !== false || name[0] === 'a' && name[1] === 'r')) {
        dom.setAttribute(name, value);
      } else {
        dom.removeAttribute(name);
      }
    }
  }
  /**
   * Proxy an event to hooked event handlers
   * @param {Event} e The event object from the browser
   * @private
   */


  function eventProxy$1(e) {
    this._listeners[e.type + false](options$1.event ? options$1.event(e) : e);
  }

  function eventProxyCapture$1(e) {
    this._listeners[e.type + true](options$1.event ? options$1.event(e) : e);
  }
  /**
   * Diff two virtual nodes and apply proper changes to the DOM
   * @param {import('../internal').PreactElement} parentDom The parent of the DOM element
   * @param {import('../internal').VNode} newVNode The new virtual node
   * @param {import('../internal').VNode} oldVNode The old virtual node
   * @param {object} globalContext The current context object. Modified by getChildContext
   * @param {boolean} isSvg Whether or not this element is an SVG node
   * @param {Array<import('../internal').PreactElement>} excessDomChildren
   * @param {Array<import('../internal').Component>} commitQueue List of components
   * which have callbacks to invoke in commitRoot
   * @param {import('../internal').PreactElement} oldDom The current attached DOM
   * element any new dom elements should be placed around. Likely `null` on first
   * render (except when hydrating). Can be a sibling DOM element when diffing
   * Fragments that have siblings. In most cases, it starts out as `oldChildren[0]._dom`.
   * @param {boolean} [isHydrating] Whether or not we are in hydration
   */


  function diff$1(parentDom, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating) {
    var A2 = newVNode ? newVNode.constructor : null;
    var A3 = newVNode ? newVNode.type : null;
    var FunctionName = A2 ? A2.name : A3 ? A3.name : "unknown";
    return namedFunction(FunctionName, function () {
      var tmp,
          newType = newVNode.type; // When passing through createElement it assigns the object
      // constructor as undefined. This to prevent JSON-injection.

      if (newVNode.constructor !== undefined) {
        return null;
      } // If the previous diff bailed out, resume creating/hydrating.


      if (oldVNode._hydrating != null) {
        isHydrating = oldVNode._hydrating;
        oldDom = newVNode._dom = oldVNode._dom; // if we resume, we want the tree to be "unlocked"

        newVNode._hydrating = null;
        excessDomChildren = [oldDom];
      }

      if (tmp = options$1._diff) {
        tmp(newVNode);
      }

      try {
        outer: if (typeof newType == 'function') {
          var c, isNew, oldProps, oldState, snapshot, clearProcessingException;
          var newProps = newVNode.props; // Necessary for createContext api. Setting this property will pass
          // the context value as `this.context` just for this component.

          tmp = newType.contextType;
          var provider = tmp && globalContext[tmp._id];
          var componentContext = tmp ? provider ? provider.props.value : tmp._defaultValue : globalContext; // Get component and set it to `c`

          if (oldVNode._component) {
            c = newVNode._component = oldVNode._component;
            clearProcessingException = c._processingException = c._pendingError;
          } else {
            // Instantiate the new component
            if ('prototype' in newType && newType.prototype.render) {
              // @ts-ignore The check above verifies that newType is suppose to be constructed
              newVNode._component = c = new newType(newProps, componentContext); // eslint-disable-line new-cap
            } else {
              // @ts-ignore Trust me, Component implements the interface we want
              newVNode._component = c = new Component$2(newProps, componentContext);
              c.constructor = newType;
              c.render = doRender$1;
            }

            if (provider) {
              provider.sub(c);
            }

            c.props = newProps;

            if (!c.state) {
              c.state = {};
            }

            c.context = componentContext;
            c._globalContext = globalContext;
            isNew = c._dirty = true;
            c._renderCallbacks = [];
          } // Invoke getDerivedStateFromProps


          if (c._nextState == null) {
            c._nextState = c.state;
          }

          if (newType.getDerivedStateFromProps != null) {
            if (c._nextState == c.state) {
              c._nextState = assign$3({}, c._nextState);
            }

            assign$3(c._nextState, newType.getDerivedStateFromProps(newProps, c._nextState));
          }

          oldProps = c.props;
          oldState = c.state; // Invoke pre-render lifecycle methods

          if (isNew) {
            if (newType.getDerivedStateFromProps == null && c.componentWillMount != null) {
              c.componentWillMount();
            }

            if (c.componentDidMount != null) {
              c._renderCallbacks.push(c.componentDidMount);
            }
          } else {
            if (newType.getDerivedStateFromProps == null && newProps !== oldProps && c.componentWillReceiveProps != null) {
              c.componentWillReceiveProps(newProps, componentContext);
            }

            if (!c._force && c.shouldComponentUpdate != null && c.shouldComponentUpdate(newProps, c._nextState, componentContext) === false || newVNode._original === oldVNode._original) {
              c.props = newProps;
              c.state = c._nextState; // More info about this here: https://gist.github.com/JoviDeCroock/bec5f2ce93544d2e6070ef8e0036e4e8

              if (newVNode._original !== oldVNode._original) {
                c._dirty = false;
              }

              c._vnode = newVNode;
              newVNode._dom = oldVNode._dom;
              newVNode._children = oldVNode._children;

              newVNode._children.forEach(function (vnode) {
                if (vnode) {
                  vnode._parent = newVNode;
                }
              });

              if (c._renderCallbacks.length) {
                commitQueue.push(c);
              }

              break outer;
            }

            if (c.componentWillUpdate != null) {
              c.componentWillUpdate(newProps, c._nextState, componentContext);
            }

            if (c.componentDidUpdate != null) {
              c._renderCallbacks.push(function () {
                c.componentDidUpdate(oldProps, oldState, snapshot);
              });
            }
          }

          c.context = componentContext;
          c.props = newProps;
          c.state = c._nextState;

          if (tmp = options$1._render) {
            tmp(newVNode);
          }

          c._dirty = false;
          c._vnode = newVNode;
          c._parentDom = parentDom;
          tmp = c.render(c.props, c.state, c.context); // Handle setState called in render, see #2553

          c.state = c._nextState;

          if (c.getChildContext != null) {
            globalContext = assign$3(assign$3({}, globalContext), c.getChildContext());
          }

          if (!isNew && c.getSnapshotBeforeUpdate != null) {
            snapshot = c.getSnapshotBeforeUpdate(oldProps, oldState);
          }

          var isTopLevelFragment = tmp != null && tmp.type === Fragment$1 && tmp.key == null;
          var renderResult = isTopLevelFragment ? tmp.props.children : tmp;
          diffChildren$1(parentDom, Array.isArray(renderResult) ? renderResult : [renderResult], newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating);
          c.base = newVNode._dom; // We successfully rendered this VNode, unset any stored hydration/bailout state:

          newVNode._hydrating = null;

          if (c._renderCallbacks.length) {
            commitQueue.push(c);
          }

          if (clearProcessingException) {
            c._pendingError = c._processingException = null;
          }

          c._force = false;
        } else if (excessDomChildren == null && newVNode._original === oldVNode._original) {
          newVNode._children = oldVNode._children;
          newVNode._dom = oldVNode._dom;
        } else {
          newVNode._dom = diffElementNodes$1(oldVNode._dom, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, isHydrating);
        }

        if (tmp = options$1.diffed) {
          tmp(newVNode);
        }
      } catch (e) {
        newVNode._original = null; // if hydrating or creating initial tree, bailout preserves DOM:

        if (isHydrating || excessDomChildren != null) {
          newVNode._dom = oldDom;
          newVNode._hydrating = !!isHydrating;
          excessDomChildren[excessDomChildren.indexOf(oldDom)] = null; // ^ could possibly be simplified to:
          // excessDomChildren.length = 0;
        }

        options$1._catchError(e, newVNode, oldVNode);
      }
    });
  }
  /**
   * @param {Array<import('../internal').Component>} commitQueue List of components
   * which have callbacks to invoke in commitRoot
   * @param {import('../internal').VNode} root
   */


  function commitRoot$1(commitQueue, root) {
    if (options$1._commit) {
      options$1._commit(root, commitQueue);
    }

    commitQueue.some(function (c) {
      try {
        // @ts-ignore Reuse the commitQueue variable here so the type changes
        commitQueue = c._renderCallbacks;
        c._renderCallbacks = [];
        commitQueue.some(function (cb) {
          // @ts-ignore See above ts-ignore on commitQueue
          cb.call(c);
        });
      } catch (e) {
        options$1._catchError(e, c._vnode);
      }
    });
  }
  /**
   * Diff two virtual nodes representing DOM element
   * @param {import('../internal').PreactElement} dom The DOM element representing
   * the virtual nodes being diffed
   * @param {import('../internal').VNode} newVNode The new virtual node
   * @param {import('../internal').VNode} oldVNode The old virtual node
   * @param {object} globalContext The current context object
   * @param {boolean} isSvg Whether or not this DOM node is an SVG node
   * @param {*} excessDomChildren
   * @param {Array<import('../internal').Component>} commitQueue List of components
   * which have callbacks to invoke in commitRoot
   * @param {boolean} isHydrating Whether or not we are in hydration
   * @returns {import('../internal').PreactElement}
   */


  function diffElementNodes$1(dom, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, isHydrating) {
    var oldProps = oldVNode.props;
    var newProps = newVNode.props;
    var nodeType = newVNode.type;
    var i = 0; // Tracks entering and exiting SVG namespace when descending through the tree.

    if (nodeType === 'svg') {
      isSvg = true;
    }

    if (excessDomChildren != null) {
      for (; i < excessDomChildren.length; i++) {
        var child = excessDomChildren[i]; // if newVNode matches an element in excessDomChildren or the `dom`
        // argument matches an element in excessDomChildren, remove it from
        // excessDomChildren so it isn't later removed in diffChildren

        if (child && (child === dom || (nodeType ? child.localName == nodeType : child.nodeType == 3))) {
          dom = child;
          excessDomChildren[i] = null;
          break;
        }
      }
    }

    if (dom == null) {
      if (nodeType === null) {
        // @ts-ignore createTextNode returns Text, we expect PreactElement
        return document.createTextNode(newProps);
      }

      if (isSvg) {
        dom = document.createElementNS('http://www.w3.org/2000/svg', // @ts-ignore We know `newVNode.type` is a string
        nodeType);
      } else {
        dom = document.createElement( // @ts-ignore We know `newVNode.type` is a string
        nodeType, newProps.is && newProps);
      } // we created a new parent, so none of the previously attached children can be reused:


      excessDomChildren = null; // we are creating a new node, so we can assume this is a new subtree (in case we are hydrating), this deopts the hydrate

      isHydrating = false;
    }

    if (nodeType === null) {
      // During hydration, we still have to split merged text from SSR'd HTML.
      if (oldProps !== newProps && (!isHydrating || dom.data !== newProps)) {
        dom.data = newProps;
      }
    } else {
      // If excessDomChildren was not null, repopulate it with the current element's children:
      excessDomChildren = excessDomChildren && slice$1.call(dom.childNodes);
      oldProps = oldVNode.props || EMPTY_OBJ$1;
      var oldHtml = oldProps.dangerouslySetInnerHTML;
      var newHtml = newProps.dangerouslySetInnerHTML; // During hydration, props are not diffed at all (including dangerouslySetInnerHTML)
      // @TODO we should warn in debug mode when props don't match here.

      if (!isHydrating) {
        // But, if we are in a situation where we are using existing DOM (e.g. replaceNode)
        // we should read the existing DOM attributes to diff them
        if (excessDomChildren != null) {
          oldProps = {};

          for (i = 0; i < dom.attributes.length; i++) {
            oldProps[dom.attributes[i].name] = dom.attributes[i].value;
          }
        }

        if (newHtml || oldHtml) {
          // Avoid re-applying the same '__html' if it did not changed between re-render
          if (!newHtml || (!oldHtml || newHtml.__html != oldHtml.__html) && newHtml.__html !== dom.innerHTML) {
            dom.innerHTML = newHtml && newHtml.__html || '';
          }
        }
      }

      diffProps$1(dom, newProps, oldProps, isSvg, isHydrating); // If the new vnode didn't have dangerouslySetInnerHTML, diff its children

      if (newHtml) {
        newVNode._children = [];
      } else {
        i = newVNode.props.children;
        diffChildren$1(dom, Array.isArray(i) ? i : [i], newVNode, oldVNode, globalContext, isSvg && nodeType !== 'foreignObject', excessDomChildren, commitQueue, excessDomChildren ? excessDomChildren[0] : oldVNode._children && getDomSibling$1(oldVNode, 0), isHydrating); // Remove children that are not part of any vnode.

        if (excessDomChildren != null) {
          for (i = excessDomChildren.length; i--;) {
            if (excessDomChildren[i] != null) {
              removeNode$1(excessDomChildren[i]);
            }
          }
        }
      } // (as above, don't diff props during hydration)


      if (!isHydrating) {
        if ('value' in newProps && (i = newProps.value) !== undefined && ( // #2756 For the <progress>-element the initial value is 0,
        // despite the attribute not being present. When the attribute
        // is missing the progress bar is treated as indeterminate.
        // To fix that we'll always update it when it is 0 for progress elements
        i !== dom.value || nodeType === 'progress' && !i)) {
          setProperty$1(dom, 'value', i, oldProps.value, false);
        }

        if ('checked' in newProps && (i = newProps.checked) !== undefined && i !== dom.checked) {
          setProperty$1(dom, 'checked', i, oldProps.checked, false);
        }
      }
    }

    return dom;
  }
  /**
   * Invoke or update a ref, depending on whether it is a function or object ref.
   * @param {object|function} ref
   * @param {any} value
   * @param {import('../internal').VNode} vnode
   */


  function applyRef$1(ref, value, vnode) {
    try {
      if (typeof ref == 'function') {
        ref(value);
      } else {
        ref.current = value;
      }
    } catch (e) {
      options$1._catchError(e, vnode);
    }
  }
  /**
   * Unmount a virtual node from the tree and apply DOM changes
   * @param {import('../internal').VNode} vnode The virtual node to unmount
   * @param {import('../internal').VNode} parentVNode The parent of the VNode that
   * initiated the unmount
   * @param {boolean} [skipRemove] Flag that indicates that a parent node of the
   * current element is already detached from the DOM.
   */


  function unmount$1(vnode, parentVNode, skipRemove) {
    var r;

    if (options$1.unmount) {
      options$1.unmount(vnode);
    }

    if (r = vnode.ref) {
      if (!r.current || r.current === vnode._dom) {
        applyRef$1(r, null, parentVNode);
      }
    }

    if ((r = vnode._component) != null) {
      if (r.componentWillUnmount) {
        try {
          r.componentWillUnmount();
        } catch (e) {
          options$1._catchError(e, parentVNode);
        }
      }

      r.base = r._parentDom = null;
    }

    if (r = vnode._children) {
      for (var i = 0; i < r.length; i++) {
        if (r[i]) {
          unmount$1(r[i], parentVNode, typeof vnode.type != 'function');
        }
      }
    }

    if (!skipRemove && vnode._dom != null) {
      removeNode$1(vnode._dom);
    } // Must be set to `undefined` to properly clean up `_nextDom`
    // for which `null` is a valid value. See comment in `create-element.js`


    vnode._dom = vnode._nextDom = undefined;
  }
  /** The `.render()` method for a PFC backing instance. */


  function doRender$1(props, state, context) {
    return this.constructor(props, context);
  }
  /**
   * Render a Preact virtual node into a DOM element
   * @param {import('./internal').ComponentChild} vnode The virtual node to render
   * @param {import('./internal').PreactElement} parentDom The DOM element to
   * render into
   * @param {import('./internal').PreactElement | object} [replaceNode] Optional: Attempt to re-use an
   * existing DOM tree rooted at `replaceNode`
   */


  function render$1(vnode, parentDom, replaceNode) {
    if (options$1._root) {
      options$1._root(vnode, parentDom);
    } // We abuse the `replaceNode` parameter in `hydrate()` to signal if we are in
    // hydration mode or not by passing the `hydrate` function instead of a DOM
    // element..


    var isHydrating = typeof replaceNode === 'function'; // To be able to support calling `render()` multiple times on the same
    // DOM node, we need to obtain a reference to the previous tree. We do
    // this by assigning a new `_children` property to DOM nodes which points
    // to the last rendered tree. By default this property is not present, which
    // means that we are mounting a new tree for the first time.

    var oldVNode = isHydrating ? null : replaceNode && replaceNode._children || parentDom._children;
    vnode = (!isHydrating && replaceNode || parentDom)._children = createElement$1(Fragment$1, null, [vnode]); // List of effects that need to be called after diffing.

    var commitQueue = [];
    diff$1(parentDom, // Determine the new vnode tree and store it on the DOM element on
    // our custom `_children` property.
    vnode, oldVNode || EMPTY_OBJ$1, EMPTY_OBJ$1, parentDom.ownerSVGElement !== undefined, !isHydrating && replaceNode ? [replaceNode] : oldVNode ? null : parentDom.firstChild ? slice$1.call(parentDom.childNodes) : null, commitQueue, !isHydrating && replaceNode ? replaceNode : oldVNode ? oldVNode._dom : parentDom.firstChild, isHydrating); // Flush all queued effects

    commitRoot$1(commitQueue, vnode);
  }
  /**
   * Update an existing DOM element with data from a Preact virtual node
   * @param {import('./internal').ComponentChild} vnode The virtual node to render
   * @param {import('./internal').PreactElement} parentDom The DOM element to
   * update
   */


  function hydrate(vnode, parentDom) {
    render$1(vnode, parentDom, hydrate);
  }
  /**
   * Clones the given VNode, optionally adding attributes/props and replacing its children.
   * @param {import('./internal').VNode} vnode The virtual DOM element to clone
   * @param {object} props Attributes/props to add when cloning
   * @param {Array<import('./internal').ComponentChildren>} rest Any additional arguments will be used as replacement children.
   * @returns {import('./internal').VNode}
   */


  function cloneElement$1(vnode, props, children) {
    var normalizedProps = assign$3({}, vnode.props),
        key,
        ref,
        i;

    for (i in props) {
      if (i == 'key') {
        key = props[i];
      } else if (i == 'ref') {
        ref = props[i];
      } else {
        normalizedProps[i] = props[i];
      }
    }

    if (arguments.length > 2) {
      normalizedProps.children = arguments.length > 3 ? slice$1.call(arguments, 2) : children;
    }

    return createVNode$1(vnode.type, normalizedProps, key || vnode.key, ref || vnode.ref, null);
  }

  var i$1 = 0;

  function createContext$1(defaultValue, contextId) {
    contextId = '__cC' + i$1++;
    var context = {
      _id: contextId,
      _defaultValue: defaultValue,

      /** @type {import('./internal').FunctionComponent} */
      Consumer: function Consumer(props, contextValue) {
        // return props.children(
        // 	context[contextId] ? context[contextId].props.value : defaultValue
        // );
        return props.children(contextValue);
      },

      /** @type {import('./internal').FunctionComponent} */
      Provider: function Provider(props) {
        if (!this.getChildContext) {
          var subs = [];
          var ctx = {};
          ctx[contextId] = this;

          this.getChildContext = function () {
            return ctx;
          };

          this.shouldComponentUpdate = function (_props) {
            if (this.props.value !== _props.value) {
              // I think the forced value propagation here was only needed when `options.debounceRendering` was being bypassed:
              // https://github.com/preactjs/preact/commit/4d339fb803bea09e9f198abf38ca1bf8ea4b7771#diff-54682ce380935a717e41b8bfc54737f6R358
              // In those cases though, even with the value corrected, we're double-rendering all nodes.
              // It might be better to just tell folks not to use force-sync mode.
              // Currently, using `useContext()` in a class component will overwrite its `this.context` value.
              // subs.some(c => {
              // 	c.context = _props.value;
              // 	enqueueRender(c);
              // });
              // subs.some(c => {
              // 	c.context[contextId] = _props.value;
              // 	enqueueRender(c);
              // });
              subs.some(enqueueRender$1);
            }
          };

          this.sub = function (c) {
            subs.push(c);
            var old = c.componentWillUnmount;

            c.componentWillUnmount = function () {
              subs.splice(subs.indexOf(c), 1);

              if (old) {
                old.call(c);
              }
            };
          };
        }

        return props.children;
      }
    }; // Devtools needs access to the context object when it
    // encounters a Provider. This is necessary to support
    // setting `displayName` on the context object instead
    // of on the component itself. See:
    // https://reactjs.org/docs/context.html#contextdisplayname

    return context.Provider._contextRef = context.Consumer.contextType = context;
  }

  var render_1 = render$1;
  var hydrate_1 = hydrate;
  var createElement_1 = createElement$1;
  var h = createElement$1;
  var Fragment_1 = Fragment$1;
  var createRef_1 = createRef;
  var isValidElement_1 = isValidElement;
  var Component_1 = Component$2;
  var cloneElement_1 = cloneElement$1;
  var createContext_1 = createContext$1;
  var toChildArray_1 = toChildArray$1;
  var options_1 = options$1;
  var preact = {
    render: render_1,
    hydrate: hydrate_1,
    createElement: createElement_1,
    h: h,
    Fragment: Fragment_1,
    createRef: createRef_1,
    isValidElement: isValidElement_1,
    Component: Component_1,
    cloneElement: cloneElement_1,
    createContext: createContext_1,
    toChildArray: toChildArray_1,
    options: options_1
  };

  function initDevTools$1() {
    if (typeof window != 'undefined' && window.__PREACT_DEVTOOLS__) {
      window.__PREACT_DEVTOOLS__.attachPreact('10.5.15', preact.options, {
        Fragment: preact.Fragment,
        Component: preact.Component
      });
    }
  }

  initDevTools$1();

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  var loggedTypeFailures = {};
  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * Adapted from https://github.com/facebook/prop-types/blob/master/checkPropTypes.js
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   */


  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    Object.keys(typeSpecs).forEach(function (typeSpecName) {
      var error;

      try {
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (e) {
        error = e;
      }

      if (error && !(error.message in loggedTypeFailures)) {
        loggedTypeFailures[error.message] = true;
        console.error("Failed " + location + " type: " + error.message + (getStack && "\n" + getStack() || ''));
      }
    });
  }

  var ELEMENT_NODE = 1;
  var DOCUMENT_NODE = 9;
  var DOCUMENT_FRAGMENT_NODE = 11;
  /**
   * Get human readable name of the component/dom node
   * @param {import('./internal').VNode} vnode
   * @param {import('./internal').VNode} vnode
   * @returns {string}
   */

  function getDisplayName(vnode) {
    if (vnode.type === preact.Fragment) {
      return 'Fragment';
    } else if (typeof vnode.type == 'function') {
      return vnode.type.displayName || vnode.type.name;
    } else if (typeof vnode.type == 'string') {
      return vnode.type;
    }

    return '#text';
  }
  /**
   * Used to keep track of the currently rendered `vnode` and print it
   * in debug messages.
   */


  var renderStack = [];
  /**
   * Keep track of the current owners. An owner describes a component
   * which was responsible to render a specific `vnode`. This exclude
   * children that are passed via `props.children`, because they belong
   * to the parent owner.
   *
   * ```jsx
   * const Foo = props => <div>{props.children}</div> // div's owner is Foo
   * const Bar = props => {
   *   return (
   *     <Foo><span /></Foo> // Foo's owner is Bar, span's owner is Bar
   *   )
   * }
   * ```
   *
   * Note: A `vnode` may be hoisted to the root scope due to compiler
   * optimiztions. In these cases the `_owner` will be different.
   */

  var ownerStack = [];
  /**
   * Get the currently rendered `vnode`
   * @returns {import('./internal').VNode | null}
   */

  function getCurrentVNode() {
    return renderStack.length > 0 ? renderStack[renderStack.length - 1] : null;
  }
  /**
   * If the user doesn't have `@babel/plugin-transform-react-jsx-source`
   * somewhere in his tool chain we can't print the filename and source
   * location of a component. In that case we just omit that, but we'll
   * print a helpful message to the console, notifying the user of it.
   */


  var hasBabelPlugin = false;
  /**
   * Check if a `vnode` is a possible owner.
   * @param {import('./internal').VNode} vnode
   */

  function isPossibleOwner(vnode) {
    return typeof vnode.type == 'function' && vnode.type != preact.Fragment;
  }
  /**
   * Return the component stack that was captured up to this point.
   * @param {import('./internal').VNode} vnode
   * @returns {string}
   */


  function getOwnerStack(vnode) {
    var stack = [vnode];
    var next = vnode;

    while (next._owner != null) {
      stack.push(next._owner);
      next = next._owner;
    }

    return stack.reduce(function (acc, owner) {
      acc += "  in " + getDisplayName(owner);
      var source = owner.__source;

      if (source) {
        acc += " (at " + source.fileName + ":" + source.lineNumber + ")";
      } else if (!hasBabelPlugin) {
        hasBabelPlugin = true;
        console.warn('Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.');
      }

      return acc += '\n';
    }, '');
  }
  /**
   * Setup code to capture the component trace while rendering. Note that
   * we cannot simply traverse `vnode._parent` upwards, because we have some
   * debug messages for `this.setState` where the `vnode` is `undefined`.
   */


  function setupComponentStack() {
    var oldDiff = preact.options._diff;
    var oldDiffed = preact.options.diffed;
    var oldRoot = preact.options._root;
    var oldVNode = preact.options.vnode;
    var oldRender = preact.options._render;

    preact.options.diffed = function (vnode) {
      if (isPossibleOwner(vnode)) {
        ownerStack.pop();
      }

      renderStack.pop();

      if (oldDiffed) {
        oldDiffed(vnode);
      }
    };

    preact.options._diff = function (vnode) {
      if (isPossibleOwner(vnode)) {
        renderStack.push(vnode);
      }

      if (oldDiff) {
        oldDiff(vnode);
      }
    };

    preact.options._root = function (vnode, parent) {
      ownerStack = [];

      if (oldRoot) {
        oldRoot(vnode, parent);
      }
    };

    preact.options.vnode = function (vnode) {
      vnode._owner = ownerStack.length > 0 ? ownerStack[ownerStack.length - 1] : null;

      if (oldVNode) {
        oldVNode(vnode);
      }
    };

    preact.options._render = function (vnode) {
      if (isPossibleOwner(vnode)) {
        ownerStack.push(vnode);
      }

      if (oldRender) {
        oldRender(vnode);
      }
    };
  }
  /**
   * Assign properties from `props` to `obj`
   * @template O, P The obj and props types
   * @param {O} obj The object to copy properties to
   * @param {P} props The object to copy properties from
   * @returns {O & P}
   */


  function assign$2(obj, props) {
    for (var i in props) {
      obj[i] = props[i];
    }

    return (
      /** @type {O & P} */
      obj
    );
  }

  var isWeakMapSupported = typeof WeakMap == 'function';

  function getClosestDomNodeParent(parent) {
    if (!parent) {
      return {};
    }

    if (typeof parent.type == 'function') {
      return getClosestDomNodeParent(parent._parent);
    }

    return parent;
  }

  function initDebug() {
    setupComponentStack();
    var hooksAllowed = false;
    /* eslint-disable no-console */

    var oldBeforeDiff = preact.options._diff;
    var oldDiffed = preact.options.diffed;
    var oldVnode = preact.options.vnode;
    var oldCatchError = preact.options._catchError;
    var oldRoot = preact.options._root;
    var oldHook = preact.options._hook;
    var warnedComponents = !isWeakMapSupported ? null : {
      useEffect: new WeakMap(),
      useLayoutEffect: new WeakMap(),
      lazyPropTypes: new WeakMap()
    };
    var deprecations = [];

    preact.options._catchError = function (error, vnode, oldVNode) {
      var component = vnode && vnode._component;

      if (component && typeof error.then == 'function') {
        var promise = error;
        error = new Error("Missing Suspense. The throwing component was: " + getDisplayName(vnode));
        var parent = vnode;

        for (; parent; parent = parent._parent) {
          if (parent._component && parent._component._childDidSuspend) {
            error = promise;
            break;
          }
        } // We haven't recovered and we know at this point that there is no
        // Suspense component higher up in the tree


        if (error instanceof Error) {
          throw error;
        }
      }

      try {
        oldCatchError(error, vnode, oldVNode); // when an error was handled by an ErrorBoundary we will nontheless emit an error
        // event on the window object. This is to make up for react compatibility in dev mode
        // and thus make the Next.js dev overlay work.

        if (typeof error.then != 'function') {
          setTimeout(function () {
            throw error;
          });
        }
      } catch (e) {
        throw e;
      }
    };

    preact.options._root = function (vnode, parentNode) {
      if (!parentNode) {
        throw new Error('Undefined parent passed to render(), this is the second argument.\n' + 'Check if the element is available in the DOM/has the correct id.');
      }

      var isValid;

      switch (parentNode.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
        case DOCUMENT_NODE:
          isValid = true;
          break;

        default:
          isValid = false;
      }

      if (!isValid) {
        var componentName = getDisplayName(vnode);
        throw new Error("Expected a valid HTML node as a second argument to render.\tReceived " + parentNode + " instead: render(<" + componentName + " />, " + parentNode + ");");
      }

      if (oldRoot) {
        oldRoot(vnode, parentNode);
      }
    };

    preact.options._diff = function (vnode) {
      var type = vnode.type,
          parent = vnode._parent;
      var parentVNode = getClosestDomNodeParent(parent);
      hooksAllowed = true;

      if (type === undefined) {
        throw new Error('Undefined component passed to createElement()\n\n' + 'You likely forgot to export your component or might have mixed up default and named imports' + serializeVNode(vnode) + ("\n\n" + getOwnerStack(vnode)));
      } else if (type != null && typeof type == 'object') {
        if (type._children !== undefined && type._dom !== undefined) {
          throw new Error("Invalid type passed to createElement(): " + type + "\n\n" + 'Did you accidentally pass a JSX literal as JSX twice?\n\n' + ("  let My" + getDisplayName(vnode) + " = " + serializeVNode(type) + ";\n") + ("  let vnode = <My" + getDisplayName(vnode) + " />;\n\n") + 'This usually happens when you export a JSX literal and not the component.' + ("\n\n" + getOwnerStack(vnode)));
        }

        throw new Error('Invalid type passed to createElement(): ' + (Array.isArray(type) ? 'array' : type));
      }

      if ((type === 'thead' || type === 'tfoot' || type === 'tbody') && parentVNode.type !== 'table') {
        console.error('Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent.' + serializeVNode(vnode) + ("\n\n" + getOwnerStack(vnode)));
      } else if (type === 'tr' && parentVNode.type !== 'thead' && parentVNode.type !== 'tfoot' && parentVNode.type !== 'tbody' && parentVNode.type !== 'table') {
        console.error('Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent.' + serializeVNode(vnode) + ("\n\n" + getOwnerStack(vnode)));
      } else if (type === 'td' && parentVNode.type !== 'tr') {
        console.error('Improper nesting of table. Your <td> should have a <tr> parent.' + serializeVNode(vnode) + ("\n\n" + getOwnerStack(vnode)));
      } else if (type === 'th' && parentVNode.type !== 'tr') {
        console.error('Improper nesting of table. Your <th> should have a <tr>.' + serializeVNode(vnode) + ("\n\n" + getOwnerStack(vnode)));
      }

      if (vnode.ref !== undefined && typeof vnode.ref != 'function' && typeof vnode.ref != 'object' && !('$$typeof' in vnode) // allow string refs when preact-compat is installed
      ) {
        throw new Error("Component's \"ref\" property should be a function, or an object created " + ("by createRef(), but got [" + typeof vnode.ref + "] instead\n") + serializeVNode(vnode) + ("\n\n" + getOwnerStack(vnode)));
      }

      if (typeof vnode.type == 'string') {
        for (var key in vnode.props) {
          if (key[0] === 'o' && key[1] === 'n' && typeof vnode.props[key] != 'function' && vnode.props[key] != null) {
            throw new Error("Component's \"" + key + "\" property should be a function, " + ("but got [" + typeof vnode.props[key] + "] instead\n") + serializeVNode(vnode) + ("\n\n" + getOwnerStack(vnode)));
          }
        }
      } // Check prop-types if available


      if (typeof vnode.type == 'function' && vnode.type.propTypes) {
        if (vnode.type.displayName === 'Lazy' && warnedComponents && !warnedComponents.lazyPropTypes.has(vnode.type)) {
          var m = 'PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ';

          try {
            var lazyVNode = vnode.type();
            warnedComponents.lazyPropTypes.set(vnode.type, true);
            console.warn(m + ("Component wrapped in lazy() is " + getDisplayName(lazyVNode)));
          } catch (promise) {
            console.warn(m + "We will log the wrapped component's name once it is loaded.");
          }
        }

        var values = vnode.props;

        if (vnode.type._forwarded) {
          values = assign$2({}, values);
          delete values.ref;
        }

        checkPropTypes(vnode.type.propTypes, values, 'prop', getDisplayName(vnode), function () {
          return getOwnerStack(vnode);
        });
      }

      if (oldBeforeDiff) {
        oldBeforeDiff(vnode);
      }
    };

    preact.options._hook = function (comp, index, type) {
      if (!comp || !hooksAllowed) {
        throw new Error('Hook can only be invoked from render methods.');
      }

      if (oldHook) {
        oldHook(comp, index, type);
      }
    }; // Ideally we'd want to print a warning once per component, but we
    // don't have access to the vnode that triggered it here. As a
    // compromise and to avoid flooding the console with warnings we
    // print each deprecation warning only once.


    var warn = function warn(property, message) {
      return {
        get: function get() {
          var key = 'get' + property + message;

          if (deprecations && deprecations.indexOf(key) < 0) {
            deprecations.push(key);
            console.warn("getting vnode." + property + " is deprecated, " + message);
          }
        },
        set: function set() {
          var key = 'set' + property + message;

          if (deprecations && deprecations.indexOf(key) < 0) {
            deprecations.push(key);
            console.warn("setting vnode." + property + " is not allowed, " + message);
          }
        }
      };
    };

    var deprecatedAttributes = {
      nodeName: warn('nodeName', 'use vnode.type'),
      attributes: warn('attributes', 'use vnode.props'),
      children: warn('children', 'use vnode.props.children')
    };
    var deprecatedProto = Object.create({}, deprecatedAttributes);

    preact.options.vnode = function (vnode) {
      var props = vnode.props;

      if (vnode.type !== null && props != null && ('__source' in props || '__self' in props)) {
        var newProps = vnode.props = {};

        for (var i in props) {
          var v = props[i];

          if (i === '__source') {
            vnode.__source = v;
          } else if (i === '__self') {
            vnode.__self = v;
          } else {
            newProps[i] = v;
          }
        }
      } // eslint-disable-next-line


      vnode.__proto__ = deprecatedProto;

      if (oldVnode) {
        oldVnode(vnode);
      }
    };

    preact.options.diffed = function (vnode) {
      // Check if the user passed plain objects as children. Note that we cannot
      // move this check into `options.vnode` because components can receive
      // children in any shape they want (e.g.
      // `<MyJSONFormatter>{{ foo: 123, bar: "abc" }}</MyJSONFormatter>`).
      // Putting this check in `options.diffed` ensures that
      // `vnode._children` is set and that we only validate the children
      // that were actually rendered.
      if (vnode._children) {
        vnode._children.forEach(function (child) {
          if (child && child.type === undefined) {
            // Remove internal vnode keys that will always be patched
            delete child._parent;
            delete child._depth;
            var keys = Object.keys(child).join(',');
            throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + keys + "}." + ("\n\n" + getOwnerStack(vnode)));
          }
        });
      }

      hooksAllowed = false;

      if (oldDiffed) {
        oldDiffed(vnode);
      }

      if (vnode._children != null) {
        var keys = [];

        for (var i = 0; i < vnode._children.length; i++) {
          var child = vnode._children[i];

          if (!child || child.key == null) {
            continue;
          }

          var key = child.key;

          if (keys.indexOf(key) !== -1) {
            console.error('Following component has two or more children with the ' + ("same key attribute: \"" + key + "\". This may cause glitches and misbehavior ") + 'in rendering process. Component: \n\n' + serializeVNode(vnode) + ("\n\n" + getOwnerStack(vnode))); // Break early to not spam the console

            break;
          }

          keys.push(key);
        }
      }
    };
  }

  var setState = preact.Component.prototype.setState;

  preact.Component.prototype.setState = function (update, callback) {
    if (this._vnode == null) {
      // `this._vnode` will be `null` during componentWillMount. But it
      // is perfectly valid to call `setState` during cWM. So we
      // need an additional check to verify that we are dealing with a
      // call inside constructor.
      if (this.state == null) {
        console.warn("Calling \"this.setState\" inside the constructor of a component is a " + "no-op and might be a bug in your application. Instead, set " + ("\"this.state = {}\" directly.\n\n" + getOwnerStack(getCurrentVNode())));
      }
    } else if (this._parentDom == null) {
      console.warn("Can't call \"this.setState\" on an unmounted component. This is a no-op, " + "but it indicates a memory leak in your application. To fix, cancel all " + "subscriptions and asynchronous tasks in the componentWillUnmount method." + ("\n\n" + getOwnerStack(this._vnode)));
    }

    return setState.call(this, update, callback);
  };

  var forceUpdate = preact.Component.prototype.forceUpdate;

  preact.Component.prototype.forceUpdate = function (callback) {
    if (this._vnode == null) {
      console.warn("Calling \"this.forceUpdate\" inside the constructor of a component is a " + ("no-op and might be a bug in your application.\n\n" + getOwnerStack(getCurrentVNode())));
    } else if (this._parentDom == null) {
      console.warn("Can't call \"this.forceUpdate\" on an unmounted component. This is a no-op, " + "but it indicates a memory leak in your application. To fix, cancel all " + "subscriptions and asynchronous tasks in the componentWillUnmount method." + ("\n\n" + getOwnerStack(this._vnode)));
    }

    return forceUpdate.call(this, callback);
  };
  /**
   * Serialize a vnode tree to a string
   * @param {import('./internal').VNode} vnode
   * @returns {string}
   */


  function serializeVNode(vnode) {
    var props = vnode.props;
    var name = getDisplayName(vnode);
    var attrs = '';

    for (var prop in props) {
      if (props.hasOwnProperty(prop) && prop !== 'children') {
        var value = props[prop]; // If it is an object but doesn't have toString(), use Object.toString

        if (typeof value == 'function') {
          value = "function " + (value.displayName || value.name) + "() {}";
        }

        value = Object(value) === value && !value.toString ? Object.prototype.toString.call(value) : value + '';
        attrs += " " + prop + "=" + JSON.stringify(value);
      }
    }

    var children = props.children;
    return "<" + name + attrs + (children && children.length ? '>..</' + name + '>' : ' />');
  }

  initDebug();

  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  /**
   * Assign properties from `props` to `obj`
   * @template O, P The obj and props types
   * @param {O} obj The object to copy properties to
   * @param {P} props The object to copy properties from
   * @returns {O & P}
   */

  function assign$1(obj, props) {
    // @ts-ignore We change the type of `obj` to be `O & P`
    for (var i in props) {
      obj[i] = props[i];
    }

    return (
      /** @type {O & P} */
      obj
    );
  }
  /**
   * Remove a child node from its parent if attached. This is a workaround for
   * IE11 which doesn't support `Element.prototype.remove()`. Using this function
   * is smaller than including a dedicated polyfill.
   * @param {Node} node The node to remove
   */


  function removeNode(node) {
    var parentNode = node.parentNode;

    if (parentNode) {
      parentNode.removeChild(node);
    }
  }

  var slice = EMPTY_ARR.slice;
  /**
   * Find the closest error boundary to a thrown error and call it
   * @param {object} error The thrown value
   * @param {import('../internal').VNode} vnode The vnode that threw
   * the error that was caught (except for unmounting when this parameter
   * is the highest parent that was being unmounted)
   */

  function _catchError(error, vnode) {
    /** @type {import('../internal').Component} */
    var component, ctor, handled;

    for (; vnode = vnode._parent;) {
      if ((component = vnode._component) && !component._processingException) {
        try {
          ctor = component.constructor;

          if (ctor && ctor.getDerivedStateFromError != null) {
            component.setState(ctor.getDerivedStateFromError(error));
            handled = component._dirty;
          }

          if (component.componentDidCatch != null) {
            component.componentDidCatch(error);
            handled = component._dirty;
          } // This is an error boundary. Mark it as having bailed out, and whether it was mid-hydration.


          if (handled) {
            return component._pendingError = component;
          }
        } catch (e) {
          error = e;
        }
      }
    }

    throw error;
  }
  /**
   * The `option` object can potentially contain callback functions
   * that are called during various stages of our renderer. This is the
   * foundation on which all our addons like `preact/debug`, `preact/compat`,
   * and `preact/hooks` are based on. See the `Options` type in `internal.d.ts`
   * for a full list of available option hooks (most editors/IDEs allow you to
   * ctrl+click or cmd+click on mac the type definition below).
   * @type {import('./internal').Options}
   */


  var options = {
    _catchError: _catchError
  };
  var vnodeId = 0;
  /**
   * Create an virtual node (used for JSX)
   * @param {import('./internal').VNode["type"]} type The node name or Component
   * constructor for this virtual node
   * @param {object | null | undefined} [props] The properties of the virtual node
   * @param {Array<import('.').ComponentChildren>} [children] The children of the virtual node
   * @returns {import('./internal').VNode}
   */

  function createElement(type, props, children) {
    var normalizedProps = {},
        key,
        ref,
        i;

    for (i in props) {
      if (i == 'key') {
        key = props[i];
      } else if (i == 'ref') {
        ref = props[i];
      } else {
        normalizedProps[i] = props[i];
      }
    }

    if (arguments.length > 2) {
      normalizedProps.children = arguments.length > 3 ? slice.call(arguments, 2) : children;
    } // If a Component VNode, check for and apply defaultProps
    // Note: type may be undefined in development, must never error here.


    if (typeof type == 'function' && type.defaultProps != null) {
      for (i in type.defaultProps) {
        if (normalizedProps[i] === undefined) {
          normalizedProps[i] = type.defaultProps[i];
        }
      }
    }

    return createVNode(type, normalizedProps, key, ref, null);
  }
  /**
   * Create a VNode (used internally by Preact)
   * @param {import('./internal').VNode["type"]} type The node name or Component
   * Constructor for this virtual node
   * @param {object | string | number | null} props The properties of this virtual node.
   * If this virtual node represents a text node, this is the text of the node (string or number).
   * @param {string | number | null} key The key for this virtual node, used when
   * diffing it against its children
   * @param {import('./internal').VNode["ref"]} ref The ref property that will
   * receive a reference to its created child
   * @returns {import('./internal').VNode}
   */


  function createVNode(type, props, key, ref, original) {
    // V8 seems to be better at detecting type shapes if the object is allocated from the same call site
    // Do not inline into createElement and coerceToVNode!
    var vnode = {
      type: type,
      props: props,
      key: key,
      ref: ref,
      _children: null,
      _parent: null,
      _depth: 0,
      _dom: null,
      // _nextDom must be initialized to undefined b/c it will eventually
      // be set to dom.nextSibling which can return `null` and it is important
      // to be able to distinguish between an uninitialized _nextDom and
      // a _nextDom that has been set to `null`
      _nextDom: undefined,
      _component: null,
      _hydrating: null,
      constructor: undefined,
      _original: original == null ? ++vnodeId : original
    }; // Only invoke the vnode hook if this was *not* a direct copy:

    if (original == null && options.vnode != null) {
      options.vnode(vnode);
    }

    return vnode;
  }

  function Fragment(props) {
    return props.children;
  }
  /**
   * Base Component class. Provides `setState()` and `forceUpdate()`, which
   * trigger rendering
   * @param {object} props The initial component props
   * @param {object} context The initial context from parent components'
   * getChildContext
   */


  function Component$1(props, context) {
    this.props = props;
    this.context = context;
  }
  /**
   * Update component state and schedule a re-render.
   * @this {import('./internal').Component}
   * @param {object | ((s: object, p: object) => object)} update A hash of state
   * properties to update with new values or a function that given the current
   * state and props returns a new partial state
   * @param {() => void} [callback] A function to be called once component state is
   * updated
   */


  Component$1.prototype.setState = function (update, callback) {
    // only clone state when copying to nextState the first time.
    var s;

    if (this._nextState != null && this._nextState !== this.state) {
      s = this._nextState;
    } else {
      s = this._nextState = assign$1({}, this.state);
    }

    if (typeof update == 'function') {
      // Some libraries like `immer` mark the current state as readonly,
      // preventing us from mutating it, so we need to clone it. See #2716
      update = update(assign$1({}, s), this.props);
    }

    if (update) {
      assign$1(s, update);
    } // Skip update if updater function returned null


    if (update == null) {
      return;
    }

    if (this._vnode) {
      if (callback) {
        this._renderCallbacks.push(callback);
      }

      enqueueRender(this);
    }
  };
  /**
   * Immediately perform a synchronous re-render of the component
   * @this {import('./internal').Component}
   * @param {() => void} [callback] A function to be called after component is
   * re-rendered
   */


  Component$1.prototype.forceUpdate = function (callback) {
    if (this._vnode) {
      // Set render mode so that we can differentiate where the render request
      // is coming from. We need this because forceUpdate should never call
      // shouldComponentUpdate
      this._force = true;

      if (callback) {
        this._renderCallbacks.push(callback);
      }

      enqueueRender(this);
    }
  };
  /**
   * Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
   * Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
   * @param {object} props Props (eg: JSX attributes) received from parent
   * element/component
   * @param {object} state The component's current state
   * @param {object} context Context object, as returned by the nearest
   * ancestor's `getChildContext()`
   * @returns {import('./index').ComponentChildren | void}
   */


  Component$1.prototype.render = Fragment;
  /**
   * @param {import('./internal').VNode} vnode
   * @param {number | null} [childIndex]
   */

  function getDomSibling(vnode, childIndex) {
    if (childIndex == null) {
      // Use childIndex==null as a signal to resume the search from the vnode's sibling
      return vnode._parent ? getDomSibling(vnode._parent, vnode._parent._children.indexOf(vnode) + 1) : null;
    }

    var sibling;

    for (; childIndex < vnode._children.length; childIndex++) {
      sibling = vnode._children[childIndex];

      if (sibling != null && sibling._dom != null) {
        // Since updateParentDomPointers keeps _dom pointer correct,
        // we can rely on _dom to tell us if this subtree contains a
        // rendered DOM node, and what the first rendered DOM node is
        return sibling._dom;
      }
    } // If we get here, we have not found a DOM node in this vnode's children.
    // We must resume from this vnode's sibling (in it's parent _children array)
    // Only climb up and search the parent if we aren't searching through a DOM
    // VNode (meaning we reached the DOM parent of the original vnode that began
    // the search)


    return typeof vnode.type == 'function' ? getDomSibling(vnode) : null;
  }
  /**
   * Trigger in-place re-rendering of a component.
   * @param {import('./internal').Component} component The component to rerender
   */


  function renderComponent(component) {
    var vnode = component._vnode,
        oldDom = vnode._dom,
        parentDom = component._parentDom;

    if (parentDom) {
      var commitQueue = [];
      var oldVNode = assign$1({}, vnode);
      oldVNode._original = vnode._original + 1;
      diff(parentDom, vnode, oldVNode, component._globalContext, parentDom.ownerSVGElement !== undefined, vnode._hydrating != null ? [oldDom] : null, commitQueue, oldDom == null ? getDomSibling(vnode) : oldDom, vnode._hydrating);
      commitRoot(commitQueue, vnode);

      if (vnode._dom != oldDom) {
        updateParentDomPointers(vnode);
      }
    }
  }
  /**
   * @param {import('./internal').VNode} vnode
   */


  function updateParentDomPointers(vnode) {
    if ((vnode = vnode._parent) != null && vnode._component != null) {
      vnode._dom = vnode._component.base = null;

      for (var i = 0; i < vnode._children.length; i++) {
        var child = vnode._children[i];

        if (child != null && child._dom != null) {
          vnode._dom = vnode._component.base = child._dom;
          break;
        }
      }

      return updateParentDomPointers(vnode);
    }
  }
  /**
   * The render queue
   * @type {Array<import('./internal').Component>}
   */


  var rerenderQueue = [];
  /**
   * Asynchronously schedule a callback
   * @type {(cb: () => void) => void}
   */

  /* istanbul ignore next */
  // Note the following line isn't tree-shaken by rollup cuz of rollup/rollup#2566

  var defer = typeof Promise == 'function' ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
  /*
   * The value of `Component.debounce` must asynchronously invoke the passed in callback. It is
   * important that contributors to Preact can consistently reason about what calls to `setState`, etc.
   * do, and when their effects will be applied. See the links below for some further reading on designing
   * asynchronous APIs.
   * * [Designing APIs for Asynchrony](https://blog.izs.me/2013/08/designing-apis-for-asynchrony)
   * * [Callbacks synchronous and asynchronous](https://blog.ometer.com/2011/07/24/callbacks-synchronous-and-asynchronous/)
   */

  var prevDebounce;
  /**
   * Enqueue a rerender of a component
   * @param {import('./internal').Component} c The component to rerender
   */

  function enqueueRender(c) {
    if (!c._dirty && (c._dirty = true) && rerenderQueue.push(c) && !process$1._rerenderCount++ || prevDebounce !== options.debounceRendering) {
      prevDebounce = options.debounceRendering;
      (prevDebounce || defer)(process$1);
    }
  }
  /** Flush the render queue by rerendering all queued components */


  function process$1() {
    var queue;

    while (process$1._rerenderCount = rerenderQueue.length) {
      queue = rerenderQueue.sort(function (a, b) {
        return a._vnode._depth - b._vnode._depth;
      });
      rerenderQueue = []; // Don't update `renderCount` yet. Keep its value non-zero to prevent unnecessary
      // process() calls from getting scheduled while `queue` is still being consumed.

      queue.some(function (c) {
        if (c._dirty) {
          renderComponent(c);
        }
      });
    }
  }

  process$1._rerenderCount = 0;
  /**
   * Diff the children of a virtual node
   * @param {import('../internal').PreactElement} parentDom The DOM element whose
   * children are being diffed
   * @param {import('../internal').ComponentChildren[]} renderResult
   * @param {import('../internal').VNode} newParentVNode The new virtual
   * node whose children should be diff'ed against oldParentVNode
   * @param {import('../internal').VNode} oldParentVNode The old virtual
   * node whose children should be diff'ed against newParentVNode
   * @param {object} globalContext The current context object - modified by getChildContext
   * @param {boolean} isSvg Whether or not this DOM node is an SVG node
   * @param {Array<import('../internal').PreactElement>} excessDomChildren
   * @param {Array<import('../internal').Component>} commitQueue List of components
   * which have callbacks to invoke in commitRoot
   * @param {import('../internal').PreactElement} oldDom The current attached DOM
   * element any new dom elements should be placed around. Likely `null` on first
   * render (except when hydrating). Can be a sibling DOM element when diffing
   * Fragments that have siblings. In most cases, it starts out as `oldChildren[0]._dom`.
   * @param {boolean} isHydrating Whether or not we are in hydration
   */

  function diffChildren(parentDom, renderResult, newParentVNode, oldParentVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating) {
    var i, j, oldVNode, childVNode, newDom, firstChildDom, refs; // This is a compression of oldParentVNode!=null && oldParentVNode != EMPTY_OBJ && oldParentVNode._children || EMPTY_ARR
    // as EMPTY_OBJ._children should be `undefined`.

    var oldChildren = oldParentVNode && oldParentVNode._children || EMPTY_ARR;
    var oldChildrenLength = oldChildren.length;
    newParentVNode._children = [];

    for (i = 0; i < renderResult.length; i++) {
      childVNode = renderResult[i];

      if (childVNode == null || typeof childVNode == 'boolean') {
        childVNode = newParentVNode._children[i] = null;
      } // If this newVNode is being reused (e.g. <div>{reuse}{reuse}</div>) in the same diff,
      // or we are rendering a component (e.g. setState) copy the oldVNodes so it can have
      // it's own DOM & etc. pointers
      else if (typeof childVNode == 'string' || typeof childVNode == 'number' || // eslint-disable-next-line valid-typeof
      typeof childVNode == 'bigint') {
        childVNode = newParentVNode._children[i] = createVNode(null, childVNode, null, null, childVNode);
      } else if (Array.isArray(childVNode)) {
        childVNode = newParentVNode._children[i] = createVNode(Fragment, {
          children: childVNode
        }, null, null, null);
      } else if (childVNode._depth > 0) {
        // VNode is already in use, clone it. This can happen in the following
        // scenario:
        //   const reuse = <div />
        //   <div>{reuse}<span />{reuse}</div>
        childVNode = newParentVNode._children[i] = createVNode(childVNode.type, childVNode.props, childVNode.key, null, childVNode._original);
      } else {
        childVNode = newParentVNode._children[i] = childVNode;
      } // Terser removes the `continue` here and wraps the loop body
      // in a `if (childVNode) { ... } condition


      if (childVNode == null) {
        continue;
      }

      childVNode._parent = newParentVNode;
      childVNode._depth = newParentVNode._depth + 1; // Check if we find a corresponding element in oldChildren.
      // If found, delete the array item by setting to `undefined`.
      // We use `undefined`, as `null` is reserved for empty placeholders
      // (holes).

      oldVNode = oldChildren[i];

      if (oldVNode === null || oldVNode && childVNode.key == oldVNode.key && childVNode.type === oldVNode.type) {
        oldChildren[i] = undefined;
      } else {
        // Either oldVNode === undefined or oldChildrenLength > 0,
        // so after this loop oldVNode == null or oldVNode is a valid value.
        for (j = 0; j < oldChildrenLength; j++) {
          oldVNode = oldChildren[j]; // If childVNode is unkeyed, we only match similarly unkeyed nodes, otherwise we match by key.
          // We always match by type (in either case).

          if (oldVNode && childVNode.key == oldVNode.key && childVNode.type === oldVNode.type) {
            oldChildren[j] = undefined;
            break;
          }

          oldVNode = null;
        }
      }

      oldVNode = oldVNode || EMPTY_OBJ; // Morph the old element into the new one, but don't append it to the dom yet

      diff(parentDom, childVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating);
      newDom = childVNode._dom;

      if ((j = childVNode.ref) && oldVNode.ref != j) {
        if (!refs) {
          refs = [];
        }

        if (oldVNode.ref) {
          refs.push(oldVNode.ref, null, childVNode);
        }

        refs.push(j, childVNode._component || newDom, childVNode);
      }

      if (newDom != null) {
        if (firstChildDom == null) {
          firstChildDom = newDom;
        }

        if (typeof childVNode.type == 'function' && childVNode._children === oldVNode._children) {
          childVNode._nextDom = oldDom = reorderChildren(childVNode, oldDom, parentDom);
        } else {
          oldDom = placeChild(parentDom, childVNode, oldVNode, oldChildren, newDom, oldDom);
        }

        if (typeof newParentVNode.type == 'function') {
          // Because the newParentVNode is Fragment-like, we need to set it's
          // _nextDom property to the nextSibling of its last child DOM node.
          //
          // `oldDom` contains the correct value here because if the last child
          // is a Fragment-like, then oldDom has already been set to that child's _nextDom.
          // If the last child is a DOM VNode, then oldDom will be set to that DOM
          // node's nextSibling.
          newParentVNode._nextDom = oldDom;
        }
      } else if (oldDom && oldVNode._dom == oldDom && oldDom.parentNode != parentDom) {
        // The above condition is to handle null placeholders. See test in placeholder.test.js:
        // `efficiently replace null placeholders in parent rerenders`
        oldDom = getDomSibling(oldVNode);
      }
    }

    newParentVNode._dom = firstChildDom; // Remove remaining oldChildren if there are any.

    for (i = oldChildrenLength; i--;) {
      if (oldChildren[i] != null) {
        if (typeof newParentVNode.type == 'function' && oldChildren[i]._dom != null && oldChildren[i]._dom == newParentVNode._nextDom) {
          // If the newParentVNode.__nextDom points to a dom node that is about to
          // be unmounted, then get the next sibling of that vnode and set
          // _nextDom to it
          newParentVNode._nextDom = getDomSibling(oldParentVNode, i + 1);
        }

        unmount(oldChildren[i], oldChildren[i]);
      }
    } // Set refs only after unmount


    if (refs) {
      for (i = 0; i < refs.length; i++) {
        applyRef(refs[i], refs[++i], refs[++i]);
      }
    }
  }

  function reorderChildren(childVNode, oldDom, parentDom) {
    // Note: VNodes in nested suspended trees may be missing _children.
    var c = childVNode._children;
    var tmp = 0;

    for (; c && tmp < c.length; tmp++) {
      var vnode = c[tmp];

      if (vnode) {
        // We typically enter this code path on sCU bailout, where we copy
        // oldVNode._children to newVNode._children. If that is the case, we need
        // to update the old children's _parent pointer to point to the newVNode
        // (childVNode here).
        vnode._parent = childVNode;

        if (typeof vnode.type == 'function') {
          oldDom = reorderChildren(vnode, oldDom, parentDom);
        } else {
          oldDom = placeChild(parentDom, vnode, vnode, c, vnode._dom, oldDom);
        }
      }
    }

    return oldDom;
  }
  /**
   * Flatten and loop through the children of a virtual node
   * @param {import('../index').ComponentChildren} children The unflattened
   * children of a virtual node
   * @returns {import('../internal').VNode[]}
   */


  function toChildArray(children, out) {
    out = out || [];
    if (children == null || typeof children == 'boolean') ;else if (Array.isArray(children)) {
      children.some(function (child) {
        toChildArray(child, out);
      });
    } else {
      out.push(children);
    }
    return out;
  }

  function placeChild(parentDom, childVNode, oldVNode, oldChildren, newDom, oldDom) {
    var nextDom;

    if (childVNode._nextDom !== undefined) {
      // Only Fragments or components that return Fragment like VNodes will
      // have a non-undefined _nextDom. Continue the diff from the sibling
      // of last DOM child of this child VNode
      nextDom = childVNode._nextDom; // Eagerly cleanup _nextDom. We don't need to persist the value because
      // it is only used by `diffChildren` to determine where to resume the diff after
      // diffing Components and Fragments. Once we store it the nextDOM local var, we
      // can clean up the property

      childVNode._nextDom = undefined;
    } else if (oldVNode == null || newDom != oldDom || newDom.parentNode == null) {
      outer: if (oldDom == null || oldDom.parentNode !== parentDom) {
        parentDom.appendChild(newDom);
        nextDom = null;
      } else {
        // `j<oldChildrenLength; j+=2` is an alternative to `j++<oldChildrenLength/2`
        for (var sibDom = oldDom, j = 0; (sibDom = sibDom.nextSibling) && j < oldChildren.length; j += 2) {
          if (sibDom == newDom) {
            break outer;
          }
        }

        parentDom.insertBefore(newDom, oldDom);
        nextDom = oldDom;
      }
    } // If we have pre-calculated the nextDOM node, use it. Else calculate it now
    // Strictly check for `undefined` here cuz `null` is a valid value of `nextDom`.
    // See more detail in create-element.js:createVNode


    if (nextDom !== undefined) {
      oldDom = nextDom;
    } else {
      oldDom = newDom.nextSibling;
    }

    return oldDom;
  }
  /**
   * Diff the old and new properties of a VNode and apply changes to the DOM node
   * @param {import('../internal').PreactElement} dom The DOM node to apply
   * changes to
   * @param {object} newProps The new props
   * @param {object} oldProps The old props
   * @param {boolean} isSvg Whether or not this node is an SVG node
   * @param {boolean} hydrate Whether or not we are in hydration mode
   */


  function diffProps(dom, newProps, oldProps, isSvg, hydrate) {
    var i;

    for (i in oldProps) {
      if (i !== 'children' && i !== 'key' && !(i in newProps)) {
        setProperty(dom, i, null, oldProps[i], isSvg);
      }
    }

    for (i in newProps) {
      if ((!hydrate || typeof newProps[i] == 'function') && i !== 'children' && i !== 'key' && i !== 'value' && i !== 'checked' && oldProps[i] !== newProps[i]) {
        setProperty(dom, i, newProps[i], oldProps[i], isSvg);
      }
    }
  }

  function setStyle(style, key, value) {
    if (key[0] === '-') {
      style.setProperty(key, value);
    } else if (value == null) {
      style[key] = '';
    } else if (typeof value != 'number' || IS_NON_DIMENSIONAL.test(key)) {
      style[key] = value;
    } else {
      style[key] = value + 'px';
    }
  }
  /**
   * Set a property value on a DOM node
   * @param {import('../internal').PreactElement} dom The DOM node to modify
   * @param {string} name The name of the property to set
   * @param {*} value The value to set the property to
   * @param {*} oldValue The old value the property had
   * @param {boolean} isSvg Whether or not this DOM node is an SVG node or not
   */


  function setProperty(dom, name, value, oldValue, isSvg) {
    var useCapture;

    o: if (name === 'style') {
      if (typeof value == 'string') {
        dom.style.cssText = value;
      } else {
        if (typeof oldValue == 'string') {
          dom.style.cssText = oldValue = '';
        }

        if (oldValue) {
          for (name in oldValue) {
            if (!(value && name in value)) {
              setStyle(dom.style, name, '');
            }
          }
        }

        if (value) {
          for (name in value) {
            if (!oldValue || value[name] !== oldValue[name]) {
              setStyle(dom.style, name, value[name]);
            }
          }
        }
      }
    } // Benchmark for comparison: https://esbench.com/bench/574c954bdb965b9a00965ac6
    else if (name[0] === 'o' && name[1] === 'n') {
      useCapture = name !== (name = name.replace(/Capture$/, '')); // Infer correct casing for DOM built-in events:

      if (name.toLowerCase() in dom) {
        name = name.toLowerCase().slice(2);
      } else {
        name = name.slice(2);
      }

      if (!dom._listeners) {
        dom._listeners = {};
      }

      dom._listeners[name + useCapture] = value;

      if (value) {
        if (!oldValue) {
          var handler = useCapture ? eventProxyCapture : eventProxy;
          dom.addEventListener(name, handler, useCapture);
        }
      } else {
        var _handler = useCapture ? eventProxyCapture : eventProxy;

        dom.removeEventListener(name, _handler, useCapture);
      }
    } else if (name !== 'dangerouslySetInnerHTML') {
      if (isSvg) {
        // Normalize incorrect prop usage for SVG:
        // - xlink:href / xlinkHref --> href (xlink:href was removed from SVG and isn't needed)
        // - className --> class
        name = name.replace(/xlink[H:h]/, 'h').replace(/sName$/, 's');
      } else if (name !== 'href' && name !== 'list' && name !== 'form' && // Default value in browsers is `-1` and an empty string is
      // cast to `0` instead
      name !== 'tabIndex' && name !== 'download' && name in dom) {
        try {
          dom[name] = value == null ? '' : value; // labelled break is 1b smaller here than a return statement (sorry)

          break o;
        } catch (e) {}
      } // ARIA-attributes have a different notion of boolean values.
      // The value `false` is different from the attribute not
      // existing on the DOM, so we can't remove it. For non-boolean
      // ARIA-attributes we could treat false as a removal, but the
      // amount of exceptions would cost us too many bytes. On top of
      // that other VDOM frameworks also always stringify `false`.


      if (typeof value === 'function') ;else if (value != null && (value !== false || name[0] === 'a' && name[1] === 'r')) {
        dom.setAttribute(name, value);
      } else {
        dom.removeAttribute(name);
      }
    }
  }
  /**
   * Proxy an event to hooked event handlers
   * @param {Event} e The event object from the browser
   * @private
   */


  function eventProxy(e) {
    this._listeners[e.type + false](options.event ? options.event(e) : e);
  }

  function eventProxyCapture(e) {
    this._listeners[e.type + true](options.event ? options.event(e) : e);
  }
  /**
   * Diff two virtual nodes and apply proper changes to the DOM
   * @param {import('../internal').PreactElement} parentDom The parent of the DOM element
   * @param {import('../internal').VNode} newVNode The new virtual node
   * @param {import('../internal').VNode} oldVNode The old virtual node
   * @param {object} globalContext The current context object. Modified by getChildContext
   * @param {boolean} isSvg Whether or not this element is an SVG node
   * @param {Array<import('../internal').PreactElement>} excessDomChildren
   * @param {Array<import('../internal').Component>} commitQueue List of components
   * which have callbacks to invoke in commitRoot
   * @param {import('../internal').PreactElement} oldDom The current attached DOM
   * element any new dom elements should be placed around. Likely `null` on first
   * render (except when hydrating). Can be a sibling DOM element when diffing
   * Fragments that have siblings. In most cases, it starts out as `oldChildren[0]._dom`.
   * @param {boolean} [isHydrating] Whether or not we are in hydration
   */


  function diff(parentDom, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating) {
    var A2 = newVNode ? newVNode.constructor : null;
    var A3 = newVNode ? newVNode.type : null;
    var FunctionName = A2 ? A2.name : A3 ? A3.name : "unknown";
    return namedFunction(FunctionName, function () {
      var tmp,
          newType = newVNode.type; // When passing through createElement it assigns the object
      // constructor as undefined. This to prevent JSON-injection.

      if (newVNode.constructor !== undefined) {
        return null;
      } // If the previous diff bailed out, resume creating/hydrating.


      if (oldVNode._hydrating != null) {
        isHydrating = oldVNode._hydrating;
        oldDom = newVNode._dom = oldVNode._dom; // if we resume, we want the tree to be "unlocked"

        newVNode._hydrating = null;
        excessDomChildren = [oldDom];
      }

      if (tmp = options._diff) {
        tmp(newVNode);
      }

      try {
        outer: if (typeof newType == 'function') {
          var c, isNew, oldProps, oldState, snapshot, clearProcessingException;
          var newProps = newVNode.props; // Necessary for createContext api. Setting this property will pass
          // the context value as `this.context` just for this component.

          tmp = newType.contextType;
          var provider = tmp && globalContext[tmp._id];
          var componentContext = tmp ? provider ? provider.props.value : tmp._defaultValue : globalContext; // Get component and set it to `c`

          if (oldVNode._component) {
            c = newVNode._component = oldVNode._component;
            clearProcessingException = c._processingException = c._pendingError;
          } else {
            // Instantiate the new component
            if ('prototype' in newType && newType.prototype.render) {
              // @ts-ignore The check above verifies that newType is suppose to be constructed
              newVNode._component = c = new newType(newProps, componentContext); // eslint-disable-line new-cap
            } else {
              // @ts-ignore Trust me, Component implements the interface we want
              newVNode._component = c = new Component$1(newProps, componentContext);
              c.constructor = newType;
              c.render = doRender;
            }

            if (provider) {
              provider.sub(c);
            }

            c.props = newProps;

            if (!c.state) {
              c.state = {};
            }

            c.context = componentContext;
            c._globalContext = globalContext;
            isNew = c._dirty = true;
            c._renderCallbacks = [];
          } // Invoke getDerivedStateFromProps


          if (c._nextState == null) {
            c._nextState = c.state;
          }

          if (newType.getDerivedStateFromProps != null) {
            if (c._nextState == c.state) {
              c._nextState = assign$1({}, c._nextState);
            }

            assign$1(c._nextState, newType.getDerivedStateFromProps(newProps, c._nextState));
          }

          oldProps = c.props;
          oldState = c.state; // Invoke pre-render lifecycle methods

          if (isNew) {
            if (newType.getDerivedStateFromProps == null && c.componentWillMount != null) {
              c.componentWillMount();
            }

            if (c.componentDidMount != null) {
              c._renderCallbacks.push(c.componentDidMount);
            }
          } else {
            if (newType.getDerivedStateFromProps == null && newProps !== oldProps && c.componentWillReceiveProps != null) {
              c.componentWillReceiveProps(newProps, componentContext);
            }

            if (!c._force && c.shouldComponentUpdate != null && c.shouldComponentUpdate(newProps, c._nextState, componentContext) === false || newVNode._original === oldVNode._original) {
              c.props = newProps;
              c.state = c._nextState; // More info about this here: https://gist.github.com/JoviDeCroock/bec5f2ce93544d2e6070ef8e0036e4e8

              if (newVNode._original !== oldVNode._original) {
                c._dirty = false;
              }

              c._vnode = newVNode;
              newVNode._dom = oldVNode._dom;
              newVNode._children = oldVNode._children;

              newVNode._children.forEach(function (vnode) {
                if (vnode) {
                  vnode._parent = newVNode;
                }
              });

              if (c._renderCallbacks.length) {
                commitQueue.push(c);
              }

              break outer;
            }

            if (c.componentWillUpdate != null) {
              c.componentWillUpdate(newProps, c._nextState, componentContext);
            }

            if (c.componentDidUpdate != null) {
              c._renderCallbacks.push(function () {
                c.componentDidUpdate(oldProps, oldState, snapshot);
              });
            }
          }

          c.context = componentContext;
          c.props = newProps;
          c.state = c._nextState;

          if (tmp = options._render) {
            tmp(newVNode);
          }

          c._dirty = false;
          c._vnode = newVNode;
          c._parentDom = parentDom;
          tmp = c.render(c.props, c.state, c.context); // Handle setState called in render, see #2553

          c.state = c._nextState;

          if (c.getChildContext != null) {
            globalContext = assign$1(assign$1({}, globalContext), c.getChildContext());
          }

          if (!isNew && c.getSnapshotBeforeUpdate != null) {
            snapshot = c.getSnapshotBeforeUpdate(oldProps, oldState);
          }

          var isTopLevelFragment = tmp != null && tmp.type === Fragment && tmp.key == null;
          var renderResult = isTopLevelFragment ? tmp.props.children : tmp;
          diffChildren(parentDom, Array.isArray(renderResult) ? renderResult : [renderResult], newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating);
          c.base = newVNode._dom; // We successfully rendered this VNode, unset any stored hydration/bailout state:

          newVNode._hydrating = null;

          if (c._renderCallbacks.length) {
            commitQueue.push(c);
          }

          if (clearProcessingException) {
            c._pendingError = c._processingException = null;
          }

          c._force = false;
        } else if (excessDomChildren == null && newVNode._original === oldVNode._original) {
          newVNode._children = oldVNode._children;
          newVNode._dom = oldVNode._dom;
        } else {
          newVNode._dom = diffElementNodes(oldVNode._dom, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, isHydrating);
        }

        if (tmp = options.diffed) {
          tmp(newVNode);
        }
      } catch (e) {
        newVNode._original = null; // if hydrating or creating initial tree, bailout preserves DOM:

        if (isHydrating || excessDomChildren != null) {
          newVNode._dom = oldDom;
          newVNode._hydrating = !!isHydrating;
          excessDomChildren[excessDomChildren.indexOf(oldDom)] = null; // ^ could possibly be simplified to:
          // excessDomChildren.length = 0;
        }

        options._catchError(e, newVNode, oldVNode);
      }
    });
  }
  /**
   * @param {Array<import('../internal').Component>} commitQueue List of components
   * which have callbacks to invoke in commitRoot
   * @param {import('../internal').VNode} root
   */


  function commitRoot(commitQueue, root) {
    if (options._commit) {
      options._commit(root, commitQueue);
    }

    commitQueue.some(function (c) {
      try {
        // @ts-ignore Reuse the commitQueue variable here so the type changes
        commitQueue = c._renderCallbacks;
        c._renderCallbacks = [];
        commitQueue.some(function (cb) {
          // @ts-ignore See above ts-ignore on commitQueue
          cb.call(c);
        });
      } catch (e) {
        options._catchError(e, c._vnode);
      }
    });
  }
  /**
   * Diff two virtual nodes representing DOM element
   * @param {import('../internal').PreactElement} dom The DOM element representing
   * the virtual nodes being diffed
   * @param {import('../internal').VNode} newVNode The new virtual node
   * @param {import('../internal').VNode} oldVNode The old virtual node
   * @param {object} globalContext The current context object
   * @param {boolean} isSvg Whether or not this DOM node is an SVG node
   * @param {*} excessDomChildren
   * @param {Array<import('../internal').Component>} commitQueue List of components
   * which have callbacks to invoke in commitRoot
   * @param {boolean} isHydrating Whether or not we are in hydration
   * @returns {import('../internal').PreactElement}
   */


  function diffElementNodes(dom, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, isHydrating) {
    var oldProps = oldVNode.props;
    var newProps = newVNode.props;
    var nodeType = newVNode.type;
    var i = 0; // Tracks entering and exiting SVG namespace when descending through the tree.

    if (nodeType === 'svg') {
      isSvg = true;
    }

    if (excessDomChildren != null) {
      for (; i < excessDomChildren.length; i++) {
        var child = excessDomChildren[i]; // if newVNode matches an element in excessDomChildren or the `dom`
        // argument matches an element in excessDomChildren, remove it from
        // excessDomChildren so it isn't later removed in diffChildren

        if (child && (child === dom || (nodeType ? child.localName == nodeType : child.nodeType == 3))) {
          dom = child;
          excessDomChildren[i] = null;
          break;
        }
      }
    }

    if (dom == null) {
      if (nodeType === null) {
        // @ts-ignore createTextNode returns Text, we expect PreactElement
        return document.createTextNode(newProps);
      }

      if (isSvg) {
        dom = document.createElementNS('http://www.w3.org/2000/svg', // @ts-ignore We know `newVNode.type` is a string
        nodeType);
      } else {
        dom = document.createElement( // @ts-ignore We know `newVNode.type` is a string
        nodeType, newProps.is && newProps);
      } // we created a new parent, so none of the previously attached children can be reused:


      excessDomChildren = null; // we are creating a new node, so we can assume this is a new subtree (in case we are hydrating), this deopts the hydrate

      isHydrating = false;
    }

    if (nodeType === null) {
      // During hydration, we still have to split merged text from SSR'd HTML.
      if (oldProps !== newProps && (!isHydrating || dom.data !== newProps)) {
        dom.data = newProps;
      }
    } else {
      // If excessDomChildren was not null, repopulate it with the current element's children:
      excessDomChildren = excessDomChildren && slice.call(dom.childNodes);
      oldProps = oldVNode.props || EMPTY_OBJ;
      var oldHtml = oldProps.dangerouslySetInnerHTML;
      var newHtml = newProps.dangerouslySetInnerHTML; // During hydration, props are not diffed at all (including dangerouslySetInnerHTML)
      // @TODO we should warn in debug mode when props don't match here.

      if (!isHydrating) {
        // But, if we are in a situation where we are using existing DOM (e.g. replaceNode)
        // we should read the existing DOM attributes to diff them
        if (excessDomChildren != null) {
          oldProps = {};

          for (i = 0; i < dom.attributes.length; i++) {
            oldProps[dom.attributes[i].name] = dom.attributes[i].value;
          }
        }

        if (newHtml || oldHtml) {
          // Avoid re-applying the same '__html' if it did not changed between re-render
          if (!newHtml || (!oldHtml || newHtml.__html != oldHtml.__html) && newHtml.__html !== dom.innerHTML) {
            dom.innerHTML = newHtml && newHtml.__html || '';
          }
        }
      }

      diffProps(dom, newProps, oldProps, isSvg, isHydrating); // If the new vnode didn't have dangerouslySetInnerHTML, diff its children

      if (newHtml) {
        newVNode._children = [];
      } else {
        i = newVNode.props.children;
        diffChildren(dom, Array.isArray(i) ? i : [i], newVNode, oldVNode, globalContext, isSvg && nodeType !== 'foreignObject', excessDomChildren, commitQueue, excessDomChildren ? excessDomChildren[0] : oldVNode._children && getDomSibling(oldVNode, 0), isHydrating); // Remove children that are not part of any vnode.

        if (excessDomChildren != null) {
          for (i = excessDomChildren.length; i--;) {
            if (excessDomChildren[i] != null) {
              removeNode(excessDomChildren[i]);
            }
          }
        }
      } // (as above, don't diff props during hydration)


      if (!isHydrating) {
        if ('value' in newProps && (i = newProps.value) !== undefined && ( // #2756 For the <progress>-element the initial value is 0,
        // despite the attribute not being present. When the attribute
        // is missing the progress bar is treated as indeterminate.
        // To fix that we'll always update it when it is 0 for progress elements
        i !== dom.value || nodeType === 'progress' && !i)) {
          setProperty(dom, 'value', i, oldProps.value, false);
        }

        if ('checked' in newProps && (i = newProps.checked) !== undefined && i !== dom.checked) {
          setProperty(dom, 'checked', i, oldProps.checked, false);
        }
      }
    }

    return dom;
  }
  /**
   * Invoke or update a ref, depending on whether it is a function or object ref.
   * @param {object|function} ref
   * @param {any} value
   * @param {import('../internal').VNode} vnode
   */


  function applyRef(ref, value, vnode) {
    try {
      if (typeof ref == 'function') {
        ref(value);
      } else {
        ref.current = value;
      }
    } catch (e) {
      options._catchError(e, vnode);
    }
  }
  /**
   * Unmount a virtual node from the tree and apply DOM changes
   * @param {import('../internal').VNode} vnode The virtual node to unmount
   * @param {import('../internal').VNode} parentVNode The parent of the VNode that
   * initiated the unmount
   * @param {boolean} [skipRemove] Flag that indicates that a parent node of the
   * current element is already detached from the DOM.
   */


  function unmount(vnode, parentVNode, skipRemove) {
    var r;

    if (options.unmount) {
      options.unmount(vnode);
    }

    if (r = vnode.ref) {
      if (!r.current || r.current === vnode._dom) {
        applyRef(r, null, parentVNode);
      }
    }

    if ((r = vnode._component) != null) {
      if (r.componentWillUnmount) {
        try {
          r.componentWillUnmount();
        } catch (e) {
          options._catchError(e, parentVNode);
        }
      }

      r.base = r._parentDom = null;
    }

    if (r = vnode._children) {
      for (var i = 0; i < r.length; i++) {
        if (r[i]) {
          unmount(r[i], parentVNode, typeof vnode.type != 'function');
        }
      }
    }

    if (!skipRemove && vnode._dom != null) {
      removeNode(vnode._dom);
    } // Must be set to `undefined` to properly clean up `_nextDom`
    // for which `null` is a valid value. See comment in `create-element.js`


    vnode._dom = vnode._nextDom = undefined;
  }
  /** The `.render()` method for a PFC backing instance. */


  function doRender(props, state, context) {
    return this.constructor(props, context);
  }
  /**
   * Render a Preact virtual node into a DOM element
   * @param {import('./internal').ComponentChild} vnode The virtual node to render
   * @param {import('./internal').PreactElement} parentDom The DOM element to
   * render into
   * @param {import('./internal').PreactElement | object} [replaceNode] Optional: Attempt to re-use an
   * existing DOM tree rooted at `replaceNode`
   */


  function render(vnode, parentDom, replaceNode) {
    if (options._root) {
      options._root(vnode, parentDom);
    } // We abuse the `replaceNode` parameter in `hydrate()` to signal if we are in
    // hydration mode or not by passing the `hydrate` function instead of a DOM
    // element..


    var isHydrating = typeof replaceNode === 'function'; // To be able to support calling `render()` multiple times on the same
    // DOM node, we need to obtain a reference to the previous tree. We do
    // this by assigning a new `_children` property to DOM nodes which points
    // to the last rendered tree. By default this property is not present, which
    // means that we are mounting a new tree for the first time.

    var oldVNode = isHydrating ? null : replaceNode && replaceNode._children || parentDom._children;
    vnode = (!isHydrating && replaceNode || parentDom)._children = createElement(Fragment, null, [vnode]); // List of effects that need to be called after diffing.

    var commitQueue = [];
    diff(parentDom, // Determine the new vnode tree and store it on the DOM element on
    // our custom `_children` property.
    vnode, oldVNode || EMPTY_OBJ, EMPTY_OBJ, parentDom.ownerSVGElement !== undefined, !isHydrating && replaceNode ? [replaceNode] : oldVNode ? null : parentDom.firstChild ? slice.call(parentDom.childNodes) : null, commitQueue, !isHydrating && replaceNode ? replaceNode : oldVNode ? oldVNode._dom : parentDom.firstChild, isHydrating); // Flush all queued effects

    commitRoot(commitQueue, vnode);
  }
  /**
   * Clones the given VNode, optionally adding attributes/props and replacing its children.
   * @param {import('./internal').VNode} vnode The virtual DOM element to clone
   * @param {object} props Attributes/props to add when cloning
   * @param {Array<import('./internal').ComponentChildren>} rest Any additional arguments will be used as replacement children.
   * @returns {import('./internal').VNode}
   */


  function cloneElement(vnode, props, children) {
    var normalizedProps = assign$1({}, vnode.props),
        key,
        ref,
        i;

    for (i in props) {
      if (i == 'key') {
        key = props[i];
      } else if (i == 'ref') {
        ref = props[i];
      } else {
        normalizedProps[i] = props[i];
      }
    }

    if (arguments.length > 2) {
      normalizedProps.children = arguments.length > 3 ? slice.call(arguments, 2) : children;
    }

    return createVNode(vnode.type, normalizedProps, key || vnode.key, ref || vnode.ref, null);
  }

  var i = 0;

  function createContext(defaultValue, contextId) {
    contextId = '__cC' + i++;
    var context = {
      _id: contextId,
      _defaultValue: defaultValue,

      /** @type {import('./internal').FunctionComponent} */
      Consumer: function Consumer(props, contextValue) {
        // return props.children(
        // 	context[contextId] ? context[contextId].props.value : defaultValue
        // );
        return props.children(contextValue);
      },

      /** @type {import('./internal').FunctionComponent} */
      Provider: function Provider(props) {
        if (!this.getChildContext) {
          var subs = [];
          var ctx = {};
          ctx[contextId] = this;

          this.getChildContext = function () {
            return ctx;
          };

          this.shouldComponentUpdate = function (_props) {
            if (this.props.value !== _props.value) {
              // I think the forced value propagation here was only needed when `options.debounceRendering` was being bypassed:
              // https://github.com/preactjs/preact/commit/4d339fb803bea09e9f198abf38ca1bf8ea4b7771#diff-54682ce380935a717e41b8bfc54737f6R358
              // In those cases though, even with the value corrected, we're double-rendering all nodes.
              // It might be better to just tell folks not to use force-sync mode.
              // Currently, using `useContext()` in a class component will overwrite its `this.context` value.
              // subs.some(c => {
              // 	c.context = _props.value;
              // 	enqueueRender(c);
              // });
              // subs.some(c => {
              // 	c.context[contextId] = _props.value;
              // 	enqueueRender(c);
              // });
              subs.some(enqueueRender);
            }
          };

          this.sub = function (c) {
            subs.push(c);
            var old = c.componentWillUnmount;

            c.componentWillUnmount = function () {
              subs.splice(subs.indexOf(c), 1);

              if (old) {
                old.call(c);
              }
            };
          };
        }

        return props.children;
      }
    }; // Devtools needs access to the context object when it
    // encounters a Provider. This is necessary to support
    // setting `displayName` on the context object instead
    // of on the component itself. See:
    // https://reactjs.org/docs/context.html#contextdisplayname

    return context.Provider._contextRef = context.Consumer.contextType = context;
  }

  function initDevTools() {
    if (typeof window != 'undefined' && window.__PREACT_DEVTOOLS__) {
      window.__PREACT_DEVTOOLS__.attachPreact('10.5.15', options, {
        Fragment: Fragment,
        Component: Component$1
      });
    }
  }

  initDevTools();

  /** @type {number} */

  var currentIndex;
  /** @type {import('./internal').Component} */

  var currentComponent;
  /** @type {number} */

  var currentHook = 0;
  /** @type {Array<import('./internal').Component>} */

  var afterPaintEffects = [];
  var oldBeforeDiff = options._diff;
  var oldBeforeRender$1 = options._render;
  var oldAfterDiff = options.diffed;
  var oldCommit = options._commit;
  var oldBeforeUnmount = options.unmount;
  var RAF_TIMEOUT = 100;
  var prevRaf;

  options._diff = function (vnode) {
    currentComponent = null;

    if (oldBeforeDiff) {
      oldBeforeDiff(vnode);
    }
  };

  options._render = function (vnode) {
    if (oldBeforeRender$1) {
      oldBeforeRender$1(vnode);
    }

    currentComponent = vnode._component;
    currentIndex = 0;
    var hooks = currentComponent.__hooks;

    if (hooks) {
      hooks._pendingEffects.forEach(invokeCleanup);

      hooks._pendingEffects.forEach(invokeEffect);

      hooks._pendingEffects = [];
    }
  };

  options.diffed = function (vnode) {
    if (oldAfterDiff) {
      oldAfterDiff(vnode);
    }

    var c = vnode._component;

    if (c && c.__hooks && c.__hooks._pendingEffects.length) {
      afterPaint(afterPaintEffects.push(c));
    }

    currentComponent = null;
  };

  options._commit = function (vnode, commitQueue) {
    commitQueue.some(function (component) {
      try {
        component._renderCallbacks.forEach(invokeCleanup);

        component._renderCallbacks = component._renderCallbacks.filter(function (cb) {
          return cb._value ? invokeEffect(cb) : true;
        });
      } catch (e) {
        commitQueue.some(function (c) {
          if (c._renderCallbacks) {
            c._renderCallbacks = [];
          }
        });
        commitQueue = [];

        options._catchError(e, component._vnode);
      }
    });

    if (oldCommit) {
      oldCommit(vnode, commitQueue);
    }
  };

  options.unmount = function (vnode) {
    if (oldBeforeUnmount) {
      oldBeforeUnmount(vnode);
    }

    var c = vnode._component;

    if (c && c.__hooks) {
      try {
        c.__hooks._list.forEach(invokeCleanup);
      } catch (e) {
        options._catchError(e, c._vnode);
      }
    }
  };
  /**
   * Get a hook's state from the currentComponent
   * @param {number} index The index of the hook to get
   * @param {number} type The index of the hook to get
   * @returns {any}
   */


  function getHookState(index, type) {
    if (options._hook) {
      options._hook(currentComponent, index, currentHook || type);
    }

    currentHook = 0; // Largely inspired by:
    // * https://github.com/michael-klein/funcy.js/blob/f6be73468e6ec46b0ff5aa3cc4c9baf72a29025a/src/hooks/core_hooks.mjs
    // * https://github.com/michael-klein/funcy.js/blob/650beaa58c43c33a74820a3c98b3c7079cf2e333/src/renderer.mjs
    // Other implementations to look at:
    // * https://codesandbox.io/s/mnox05qp8

    var hooks = currentComponent.__hooks || (currentComponent.__hooks = {
      _list: [],
      _pendingEffects: []
    });

    if (index >= hooks._list.length) {
      hooks._list.push({});
    }

    return hooks._list[index];
  }
  /**
   * @param {import('./index').StateUpdater<any>} [initialState]
   */


  function useState$1(initialState) {
    currentHook = 1;
    return useReducer(invokeOrReturn, initialState);
  }
  /**
   * @param {import('./index').Reducer<any, any>} reducer
   * @param {import('./index').StateUpdater<any>} initialState
   * @param {(initialState: any) => void} [init]
   * @returns {[ any, (state: any) => void ]}
   */


  function useReducer(reducer, initialState, init) {
    /** @type {import('./internal').ReducerHookState} */
    var hookState = getHookState(currentIndex++, 2);
    hookState._reducer = reducer;

    if (!hookState._component) {
      hookState._value = [!init ? invokeOrReturn(undefined, initialState) : init(initialState), function (action) {
        var nextValue = hookState._reducer(hookState._value[0], action);

        if (hookState._value[0] !== nextValue) {
          hookState._value = [nextValue, hookState._value[1]];

          hookState._component.setState({});
        }
      }];
      hookState._component = currentComponent;
    }

    return hookState._value;
  }
  /**
   * @param {import('./internal').Effect} callback
   * @param {any[]} args
   */


  function useEffect$1(callback, args) {
    /** @type {import('./internal').EffectHookState} */
    var state = getHookState(currentIndex++, 3);

    if (!options._skipEffects && argsChanged$1(state._args, args)) {
      state._value = callback;
      state._args = args;

      currentComponent.__hooks._pendingEffects.push(state);
    }
  }
  /**
   * @param {import('./internal').Effect} callback
   * @param {any[]} args
   */


  function useLayoutEffect$1(callback, args) {
    /** @type {import('./internal').EffectHookState} */
    var state = getHookState(currentIndex++, 4);

    if (!options._skipEffects && argsChanged$1(state._args, args)) {
      state._value = callback;
      state._args = args;

      currentComponent._renderCallbacks.push(state);
    }
  }

  function useRef(initialValue) {
    currentHook = 5;
    return useMemo(function () {
      return {
        current: initialValue
      };
    }, []);
  }
  /**
   * @param {() => any} factory
   * @param {any[]} args
   */


  function useMemo(factory, args) {
    /** @type {import('./internal').MemoHookState} */
    var state = getHookState(currentIndex++, 7);

    if (argsChanged$1(state._args, args)) {
      state._value = factory();
      state._args = args;
      state._factory = factory;
    }

    return state._value;
  }
  /**
   * @param {() => void} callback
   * @param {any[]} args
   */


  function useCallback(callback, args) {
    currentHook = 8;
    return useMemo(function () {
      return callback;
    }, args);
  }
  /**
   * @param {import('./internal').PreactContext} context
   */


  function useContext(context) {
    var provider = currentComponent.context[context._id]; // We could skip this call here, but than we'd not call
    // `options._hook`. We need to do that in order to make
    // the devtools aware of this hook.

    /** @type {import('./internal').ContextHookState} */

    var state = getHookState(currentIndex++, 9); // The devtools needs access to the context object to
    // be able to pull of the default value when no provider
    // is present in the tree.

    state._context = context;

    if (!provider) {
      return context._defaultValue;
    } // This is probably not safe to convert to "!"


    if (state._value == null) {
      state._value = true;
      provider.sub(currentComponent);
    }

    return provider.props.value;
  }
  /**
   * After paint effects consumer.
   */


  function flushAfterPaintEffects() {
    afterPaintEffects.forEach(function (component) {
      if (component._parentDom) {
        try {
          component.__hooks._pendingEffects.forEach(invokeCleanup);

          component.__hooks._pendingEffects.forEach(invokeEffect);

          component.__hooks._pendingEffects = [];
        } catch (e) {
          component.__hooks._pendingEffects = [];

          options._catchError(e, component._vnode);
        }
      }
    });
    afterPaintEffects = [];
  }

  var HAS_RAF = typeof requestAnimationFrame == 'function';
  /**
   * Schedule a callback to be invoked after the browser has a chance to paint a new frame.
   * Do this by combining requestAnimationFrame (rAF) + setTimeout to invoke a callback after
   * the next browser frame.
   *
   * Also, schedule a timeout in parallel to the the rAF to ensure the callback is invoked
   * even if RAF doesn't fire (for example if the browser tab is not visible)
   *
   * @param {() => void} callback
   */

  function afterNextFrame(callback) {
    var done = function done() {
      clearTimeout(timeout);

      if (HAS_RAF) {
        cancelAnimationFrame(raf);
      }

      setTimeout(callback);
    };

    var timeout = setTimeout(done, RAF_TIMEOUT);
    var raf;

    if (HAS_RAF) {
      raf = requestAnimationFrame(done);
    }
  } // Note: if someone used options.debounceRendering = requestAnimationFrame,
  // then effects will ALWAYS run on the NEXT frame instead of the current one, incurring a ~16ms delay.
  // Perhaps this is not such a big deal.

  /**
   * Schedule afterPaintEffects flush after the browser paints
   * @param {number} newQueueLength
   */


  function afterPaint(newQueueLength) {
    if (newQueueLength === 1 || prevRaf !== options.requestAnimationFrame) {
      prevRaf = options.requestAnimationFrame;
      (prevRaf || afterNextFrame)(flushAfterPaintEffects);
    }
  }
  /**
   * @param {import('./internal').EffectHookState} hook
   */


  function invokeCleanup(hook) {
    // A hook cleanup can introduce a call to render which creates a new root, this will call options.vnode
    // and move the currentComponent away.
    var comp = currentComponent;

    if (typeof hook._cleanup == 'function') {
      hook._cleanup();
    }

    currentComponent = comp;
  }
  /**
   * Invoke a Hook's effect
   * @param {import('./internal').EffectHookState} hook
   */


  function invokeEffect(hook) {
    // A hook call can introduce a call to render which creates a new root, this will call options.vnode
    // and move the currentComponent away.
    var comp = currentComponent;
    hook._cleanup = hook._value();
    currentComponent = comp;
  }
  /**
   * @param {any[]} oldArgs
   * @param {any[]} newArgs
   */


  function argsChanged$1(oldArgs, newArgs) {
    return !oldArgs || oldArgs.length !== newArgs.length || newArgs.some(function (arg, index) {
      return arg !== oldArgs[index];
    });
  }

  function invokeOrReturn(arg, f) {
    return typeof f == 'function' ? f(arg) : f;
  }

  function useMergedChildren(lhsProps, rhsProps) {
    const lhs = lhsProps === null || lhsProps === void 0 ? void 0 : lhsProps.children;
    const rhs = rhsProps === null || rhsProps === void 0 ? void 0 : rhsProps.children;

    if (lhs == null && rhs == null) {
      return undefined;
    } else if (lhs == null) {
      return rhs;
    } else if (rhs == null) {
      return lhs;
    } else {
      let ret = createElement(Fragment, {}, lhs, rhs);
      return ret;
    }
  }

  function toVal(mix) {
    var k,
        y,
        str = '';

    if (typeof mix === 'string' || typeof mix === 'number') {
      str += mix;
    } else if (typeof mix === 'object') {
      if (Array.isArray(mix)) {
        for (k = 0; k < mix.length; k++) {
          if (mix[k]) {
            if (y = toVal(mix[k])) {
              str && (str += ' ');
              str += y;
            }
          }
        }
      } else {
        for (k in mix) {
          if (mix[k]) {
            str && (str += ' ');
            str += k;
          }
        }
      }
    }

    return str;
  }

  function clsx () {
    var i = 0,
        tmp,
        x,
        str = '';

    while (i < arguments.length) {
      if (tmp = arguments[i++]) {
        if (x = toVal(tmp)) {
          str && (str += ' ');
          str += x;
        }
      }
    }

    return str;
  }

  /**
   * Given two sets of props, merges their `class` and `className` properties.
   * Duplicate classes are removed (order doesn't matter anyway).
   *
   * @param lhs Classes of the first component
   * @param rhs Classes of the second component
   * @returns A string representing all combined classes from both arguments.
   */

  function useMergedClasses(lhs, rhs) {
    // Note: For the sake of forward compatibility, this function is labelled as
    // a hook, but as it uses no other hooks it technically isn't one.
    return mergeClasses(lhs, rhs);
  }

  function mergeClasses(lhs, rhs) {
    const lhsClass = lhs === null || lhs === void 0 ? void 0 : lhs.class;
    const lhsClassName = lhs === null || lhs === void 0 ? void 0 : lhs.className;
    const rhsClass = rhs === null || rhs === void 0 ? void 0 : rhs.class;
    const rhsClassName = rhs === null || rhs === void 0 ? void 0 : rhs.className;

    if (lhsClass || rhsClass || lhsClassName || rhsClassName) {
      let lhsClasses = clsx(lhsClass, lhsClassName).split(" ");
      let rhsClasses = clsx(rhsClass, rhsClassName).split(" ");
      let allClasses = new Set([...Array.from(lhsClasses), ...Array.from(rhsClasses)]);
      return Array.from(allClasses).join(" ");
    } else {
      return undefined;
    }
  }

  function processRef(instance, ref) {
    if (typeof ref === "function") {
      ref(instance);
    } else if (ref != null) {
      ref.current = instance;
    } else {
      debugger; // Intentional

      console.assert(false, "Unknown ref type found that was neither a RefCallback nor a RefObject");
    }
  }
  /**
   * Combines two refs into one. This allows a component to both use its own ref *and* forward a ref that was given to it.
   * @param lhs
   * @param rhs
   * @returns
   */


  function useMergedRefs() {
    return function (lhsProps, rhsProps) {
      const lhs = lhsProps === null || lhsProps === void 0 ? void 0 : lhsProps.ref;
      const rhs = rhsProps === null || rhsProps === void 0 ? void 0 : rhsProps.ref;
      let combined = useCallback(current => {
        processRef(current, lhs);
        processRef(current, rhs);
      }, [lhs, rhs]);

      if (lhs == null && rhs == null) {
        return undefined;
      } else if (lhs == null) {
        return rhs;
      } else if (rhs == null) {
        return lhs;
      } else {
        return combined;
      }
    };
  }
  /*
  function typetest<P extends h.JSX.HTMLAttributes<HTMLInputElement>>(props: P) {

      const ref: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

      function acceptsRef(ref: Ref<any>) { }
      function acceptsOptionalRef(ref: Ref<any> | undefined) { }

      const c = [
          useMergedRefs<HTMLInputElement>()(undefined, undefined),
          useMergedRefs<HTMLInputElement>()({}, undefined),
          useMergedRefs<HTMLInputElement>()(props, undefined),
          useMergedRefs<HTMLInputElement>()(undefined, props),
          useMergedRefs<HTMLInputElement>()(props, props),
          useMergedRefs<HTMLInputElement>()({ ref }, props),
          useMergedRefs<HTMLInputElement>()({ ref }, { ref: undefined }),
          useMergedRefs<HTMLInputElement>()({ ref: undefined }, { ref }),
          useMergedRefs<HTMLInputElement>()({ ref }, { ref }),
      ] as const;

      /// @ts-expect-error
      acceptsRef(c[0]);
      /// @ts-expect-error
      acceptsRef(c[1]);

      acceptsOptionalRef(c[2]);
      acceptsOptionalRef(c[3]);
      acceptsOptionalRef(c[4]);

      /// @ts-expect-error TODO
      acceptsRef(c[5]);
      acceptsRef(c[6]);
      acceptsRef(c[7]);
      acceptsRef(c[8]);
  }
  */

  function styleStringToObject(style) {
    // TODO: This sucks D:
    return Object.fromEntries(style.split(";").map(statement => statement.split(":")));
  }
  /**
   * Merges two style objects, returning the result.
   *
   * @param style The user-given style prop for this component
   * @param obj The CSS properties you want added to the user-given style
   * @returns A CSS object containing the properties of both objects.
   */


  function useMergedStyles(lhs, rhs) {
    var _lhs$style, _rhs$style2;

    // Easy case, when there are no styles to merge return nothing.
    if (!(lhs !== null && lhs !== void 0 && lhs.style) && !(rhs !== null && rhs !== void 0 && rhs.style)) return undefined;

    if (typeof lhs != typeof rhs) {
      // Easy cases, when one is null and the other isn't.
      if (lhs !== null && lhs !== void 0 && lhs.style && !(rhs !== null && rhs !== void 0 && rhs.style)) return lhs.style;
      if (!(lhs !== null && lhs !== void 0 && lhs.style) && rhs !== null && rhs !== void 0 && rhs.style) return rhs.style; // They're both non-null but different types.
      // Convert the string type to an object bag type and run it again.

      if (lhs !== null && lhs !== void 0 && lhs.style && rhs !== null && rhs !== void 0 && rhs.style) {
        // (useMergedStyles isn't a true hook -- this isn't a violation)
        if (typeof (lhs === null || lhs === void 0 ? void 0 : lhs.style) == "string") return useMergedStyles({
          style: styleStringToObject(lhs === null || lhs === void 0 ? void 0 : lhs.style)
        }, rhs);
        if (typeof (rhs === null || rhs === void 0 ? void 0 : rhs.style) == "string") return useMergedStyles(lhs, {
          style: styleStringToObject(rhs === null || rhs === void 0 ? void 0 : rhs.style)
        });
      } // Logic???


      return undefined;
    } // They're both strings, just concatenate them.


    if (typeof (lhs === null || lhs === void 0 ? void 0 : lhs.style) == "string") {
      var _rhs$style;

      return `${lhs.style};${(_rhs$style = rhs === null || rhs === void 0 ? void 0 : rhs.style) !== null && _rhs$style !== void 0 ? _rhs$style : ""}`;
    } // They're both objects, just merge them.


    return { ...((_lhs$style = lhs === null || lhs === void 0 ? void 0 : lhs.style) !== null && _lhs$style !== void 0 ? _lhs$style : {}),
      ...((_rhs$style2 = rhs === null || rhs === void 0 ? void 0 : rhs.style) !== null && _rhs$style2 !== void 0 ? _rhs$style2 : {})
    };
  }

  let log = str => {
    debugger;
    console.warn(`Trying to merge two props with the same name: ${str}`);
    /* Intentional */
  };
  /**
   * Given two sets of props, merges them and returns the result.
   *
   * The hook is aware of and can intelligently merge `className`, `class`, `style`, `ref`, and all event handlers.
   * @param lhs2
   * @param rhs2
   * @returns
   */

  function useMergedProps() {
    return function (lhs2, rhs2) {
      // First, put in all the properties that are easy to reason about
      // and all lhs props. We're going to merge in rhs just after.
      const {
        children: lhsChildren,
        class: lhsClass,
        className: lhsClassName,
        style: lhsStyle,
        ref: lhsRef,
        ...lhs
      } = lhs2;
      const {
        children: rhsChildren,
        class: rhsClass,
        className: rhsClassName,
        style: rhsStyle,
        ref: rhsRef,
        ...rhs
      } = rhs2;
      let ret = { ...lhs,
        ref: useMergedRefs()(lhs2, rhs2),
        style: useMergedStyles(lhs2, rhs2),
        className: useMergedClasses(lhs2, rhs2),
        children: useMergedChildren(lhs2, rhs2)
      };
      if (ret.ref === undefined) delete ret.ref;
      if (ret.style === undefined) delete ret.style;
      if (ret.className === undefined) delete ret.className;
      if (ret.children === undefined) delete ret.children; // Now, do *everything* else
      // Merge every remaining existing entry in lhs with what we've already put in ret.
      //const lhsEntries = Object.entries(lhs) as [keyof T, T[keyof T]][];

      const rhsEntries = Object.entries(rhs);

      for (const [rhsKey, rhsValue] of rhsEntries) {
        const lhsValue = lhs[rhsKey];

        if (typeof lhsValue === "function" || typeof rhsValue === "function") {
          // They're both functions that can be merged (or one's a function and the other's null).
          // Not an *easy* case, but a well-defined one.
          const merged = mergeFunctions(lhsValue, rhsValue);
          ret[rhsKey] = merged;
        } else {
          // Uh...we're here because one of them's null, right?
          if (lhsValue == null && rhsValue == null) {
            if (rhsValue === null && lhsValue === undefined) ret[rhsKey] = rhsValue;else ret[rhsKey] = lhsValue;
          }

          if (lhsValue == null) ret[rhsKey] = rhsValue;else if (rhsValue == null) ret[rhsKey] = lhsValue;else if (rhsValue == lhsValue) ; else {
            var _log;

            // Ugh.
            // No good strategies here, just log it if requested
            (_log = log) === null || _log === void 0 ? void 0 : _log(`Could not merge incompatible prop "${rhsKey}" (type: ${typeof rhsValue}, values: [${lhsValue}, ${rhsValue}])`);
            ret[rhsKey] = rhsValue;
          }
        }
      }

      return ret;
    };
  }

  function mergeFunctions(lhs, rhs) {
    if (!lhs) return rhs;
    if (!rhs) return lhs;
    return (...args) => {
      let lv = lhs(...args);
      let rv = rhs(...args);
      if (lv instanceof Promise || rv instanceof Promise) return Promise.all([lv, rv]);
    };
  }
  /*
  function test<P extends h.JSX.HTMLAttributes<HTMLInputElement>>(props: P) {

      const id0: GenericGet<{}, "id", string> = "";
      const id3: GenericGet<{ id: undefined }, "id", string> = undefined;
      const id4: GenericGet<{ id: undefined }, "id", string> = undefined;
      const id5: GenericGet<{ id: undefined }, "id", string> = undefined;
      const id6: GenericGet<{ id: undefined }, "id", string> = undefined;
      //const id2: ZipSingle<string | undefined, string | undefined> = undefined;
      const id1: ZipObject<{ id: undefined }, { id: string }> = { id: undefined };

      type M1 = GenericGet<P, "style", string>;
      type M2 = GenericGet<{}, "style", string>;
      const m1: M1 = "";
      const m2: M1 = undefined;
      /// @ts-expect-error    Because number isn't assignable to string
      const m3: M1 = 0;

      const m4: M2 = "";
      const m5: M2 = undefined;
      /// @ts-expect-error    Because number isn't assignable to string
      const m6: M2 = 0;

      const p1: MergedProps<HTMLInputElement, {}, { id: string }> = useMergedProps<HTMLInputElement>()({}, { id: "string" });
      const p2: MergedProps<HTMLInputElement, { id: undefined }, { id: string }> = useMergedProps<HTMLInputElement>()({ id: undefined }, { id: "string" });
      const p3: MergedProps<HTMLInputElement, { id: undefined }, { id: undefined }> = useMergedProps<HTMLInputElement>()({ id: undefined }, { id: undefined });
      const p4: MergedProps<HTMLInputElement, {}, {}> = useMergedProps<HTMLInputElement>()({}, {});
      const p5 = useMergedProps<HTMLInputElement>()(props, {});
      const p6 = useMergedProps<HTMLInputElement>()(props, { id: undefined });
      const p7 = useMergedProps<HTMLInputElement>()(props, { id: "string" });


      p1.id?.concat("");
      p2.id?.concat("");
      /// @ts-expect-error    id can't be anything but undefined
      p3.id?.concat("");
      /// @ts-expect-error    id can't be anything but undefined
      p4.id?.concat("");


      p5.id?.concat("");
      p6.id?.concat("");
      p7.id?.concat("");

      /// @ts-expect-error    id must contain undefined
      p5.id.concat("");
      /// @ts-expect-error    id must contain undefined
      p6.id.concat("");
      /// @ts-expect-error    id must contain undefined
      p7.id.concat("");


      if (p5.allowFullScreen === undefined) {}
      else if (p5.allowFullScreen === false) {}
      else if (p5.allowFullScreen === true) {}
      else {
          acceptsNever(p5.allowFullScreen);
      }


      if (p6.allowFullScreen === undefined) {}
      else if (p6.allowFullScreen === false) {}
      else if (p6.allowFullScreen === true) {}
      else {
          acceptsNever(p6.allowFullScreen);
      }


      if (p7.allowFullScreen === undefined) {}
      else if (p7.allowFullScreen === false) {}
      else if (p7.allowFullScreen === true) {}
      else {
          acceptsNever(p7.allowFullScreen);
      }


      // Make sure it works recursively
      const r1a = useMergedProps<HTMLInputElement>()({}, p1);
      const r1b = useMergedProps<HTMLInputElement>()(props, p1);
      const r2a = useMergedProps<HTMLInputElement>()({}, p2);
      const r2b = useMergedProps<HTMLInputElement>()(props, p2);
      const r3a = useMergedProps<HTMLInputElement>()({}, p3);
      const r3b = useMergedProps<HTMLInputElement>()(props, p3);
      const r4a = useMergedProps<HTMLInputElement>()({}, p4);
      const r4b = useMergedProps<HTMLInputElement>()(props, p4);
      const r5a = useMergedProps<HTMLInputElement>()({}, p5);
      const r5b = useMergedProps<HTMLInputElement>()(props, p5);
      const r6a = useMergedProps<HTMLInputElement>()({}, p6);
      const r6b = useMergedProps<HTMLInputElement>()(props, p6);
      const r7a = useMergedProps<HTMLInputElement>()({}, p7);
      const r7b = useMergedProps<HTMLInputElement>()(props, p7);


      r1a.id?.concat("");
      r1b.id?.concat("");
      r2a.id?.concat("");
      r2b.id?.concat("");
      // @ts-expect-error    id can't be anything but undefined
      r3a.id?.concat("");
      r3b.id?.concat("");
      /// @ts-expect-error    id can't be anything but undefined
      r4a.id?.concat("");
      r4b.id?.concat("");


      r5a.id?.concat("");
      r5b.id?.concat("");
      r6a.id?.concat("");
      r6b.id?.concat("");
      r7a.id?.concat("");
      r7b.id?.concat("");

      /// @ts-expect-error    id must contain undefined
      r5a.id.concat("");
      /// @ts-expect-error    id must contain undefined
      r5b.id.concat("");
      /// @ts-expect-error    id must contain undefined
      r6a.id.concat("");
      /// @ts-expect-error    id must contain undefined
      r6b.id.concat("");
      /// @ts-expect-error    id must contain undefined
      r7a.id.concat("");
      /// @ts-expect-error    id must contain undefined
      r7b.id.concat("");


      if (r5a.allowFullScreen === undefined) {}
      else if (r5a.allowFullScreen === false) {}
      else if (r5a.allowFullScreen === true) {}
      else {
          acceptsNever(r5a.allowFullScreen);
      }


      if (r5b.allowFullScreen === undefined) {}
      else if (r5b.allowFullScreen === false) {}
      else if (r5b.allowFullScreen === true) {}
      else {
          acceptsNever(r5b.allowFullScreen);
      }


      if (r6a.allowFullScreen === undefined) {}
      else if (r6a.allowFullScreen === false) {}
      else if (r6a.allowFullScreen === true) {}
      else {
          acceptsNever(r6a.allowFullScreen);
      }


      if (r6b.allowFullScreen === undefined) {}
      else if (r6b.allowFullScreen === false) {}
      else if (r6b.allowFullScreen === true) {}
      else {
          acceptsNever(r6b.allowFullScreen);
      }


      if (r7a.allowFullScreen === undefined) {}
      else if (r7a.allowFullScreen === false) {}
      else if (r7a.allowFullScreen === true) {}
      else {
          acceptsNever(r7a.allowFullScreen);
      }


      if (r7b.allowFullScreen === undefined) {}
      else if (r7b.allowFullScreen === false) {}
      else if (r7b.allowFullScreen === true) {}
      else {
          acceptsNever(r7b.allowFullScreen);
      }

  }
  function acceptsNever(n: never) {}
  */

  /**
   * Slightly enhanced version of `useState` that includes a getter that remains constant
   * (i.e. you can use it in `useEffect` and friends without it being a dependency).
   *
   * @param initialState
   * @returns
   */

  function useState(initialState) {
    // We keep both, but overrride the `setState` functionality
    const [state, setStateP] = useState$1(initialState);
    const ref = useRef(state); // Hijack the normal setter function 
    // to also set our ref to the new value

    const setState = useCallback(value => {
      if (typeof value === "function") {
        let callback = value;
        setStateP(prevValue => {
          let nextValue = callback(prevValue);
          ref.current = nextValue;
          return nextValue;
        });
      } else {
        ref.current = value;
        setStateP(value);
      }
    }, []);

    const getState = () => {
      return ref.current;
    };

    console.assert(ref.current === state || typeof state === "number" && isNaN(state));
    return [state, setState, getState];
  }

  const Table$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

  function base64(value) {
    return Table$1[value];
  }

  function random6Bits() {
    return Math.floor(Math.random() * 0b1000000);
  }

  function random64Bits() {
    return [random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits(), random6Bits()];
  }
  /**
   * Returns a randomly-generated ID with an optional prefix.
   * Note that if the prefix is *explicitly* set to "", then
   * IDs that are not valid under HTML4 may be generated. Oh no.
   */


  function generateRandomId(prefix) {
    return `${prefix !== null && prefix !== void 0 ? prefix : "id-"}${random64Bits().map(n => base64(n)).join("")}`;
  }
  /**
   * Returns a hook that modifies a set of props to provide a randomly-generated ID if one was not provided.
   *
   * If you'd like to use the ID in a property that's *not* named `id` (like `for` or `aria-labelledby` or whatnot), `useReferencedIdProps` is also provided.
   *
   * And the randomly-generated id itself is also provided in case you want to handle the logic yourself without `useMergedProps`.
   *
   * Unlike most other `use*Props` hooks, these are mostly stable.
   */

  function useRandomId({
    prefix
  } = {}) {
    const [randomId, setRandomId] = useState(() => generateRandomId(prefix));
    const [watchPrefixUpdates, setWatchPrefixUpdates, getWatchPrefixUpdates] = useState(false);
    useLayoutEffect$1(() => {
      const watchPrefixUpdates = getWatchPrefixUpdates();
      if (watchPrefixUpdates) setRandomId(() => generateRandomId(prefix));
      setWatchPrefixUpdates(true);
    }, [prefix]); // Whatever ID was most recently used by the actual "id" prop.
    // Used so that any ID-referencing props don't need to provide the same value.
    //
    // TODO: This does mean that on the first render, if just the ID is provided,
    // there will be a temporary mismatch, but it's corrected before rendering finishes.
    // Is this okay?

    const [usedId, setUsedId, getUsedId] = useState(undefined);
    const useReferencedIdProps = useCallback(function useReferencedIdProps(idPropName) {
      const ret = function ({
        [idPropName]: givenId,
        ...props
      }) {
        var _ref, _ref2;

        const usedId2 = (_ref = (_ref2 = givenId !== null && givenId !== void 0 ? givenId : usedId) !== null && _ref2 !== void 0 ? _ref2 : randomId) !== null && _ref !== void 0 ? _ref : undefined;
        if (idPropName === "id") setUsedId(usedId2);
        return useMergedProps()({
          [idPropName]: usedId2
        }, props);
      };

      return ret;
    }, [usedId, randomId]);
    const useRandomIdProps = useCallback(function useRandomIdProps(p) {
      return useReferencedIdProps("id")(p);
    }, [useReferencedIdProps]);
    return {
      randomId,
      id: usedId,
      getId: getUsedId,
      useRandomIdProps,
      useReferencedIdProps
    };
  }

  const previousInputs = new Map();
  const toRun = new Map(); // TODO: Whether this goes in options.diffed or options._commit
  // is a post-suspense question.
  // Right now, using options._commit has the problem of running
  // *after* refs are applied, but we need to come before even that
  // so `ref={someStableFunction}` works.
  // 
  // Also it's private.

  const originalDiffed = options.diffed;

  options.diffed = (vnode, ...args) => {
    for (let [id, {
      effect,
      inputs
    }] of toRun) {
      const oldInputs = previousInputs.get(id);

      if (argsChanged(oldInputs, inputs)) {
        effect();
        previousInputs.set(id, inputs);
      }
    }

    toRun.clear();
    originalDiffed === null || originalDiffed === void 0 ? void 0 : originalDiffed(vnode, ...args);
  };
  /**
   * Semi-private function to allow stable callbacks even within `useLayoutEffect` and ref assignment.
   *
   * Every render, we send the arguments to be evaluated after diffing has completed,
   * which happens before.
   *
   * @param effect
   * @param inputs
   */


  function useBeforeLayoutEffect(effect, inputs) {
    const [id] = useState$1(() => generateRandomId());
    toRun.set(id, {
      effect,
      inputs
    });
    useEffect$1(() => {
      return () => {
        toRun.delete(id);
        previousInputs.delete(id);
      };
    }, [id]);
  }

  function argsChanged(oldArgs, newArgs) {
    return !!(!oldArgs || oldArgs.length !== (newArgs === null || newArgs === void 0 ? void 0 : newArgs.length) || newArgs !== null && newArgs !== void 0 && newArgs.some((arg, index) => arg !== oldArgs[index]));
  }

  const Unset$1 = Symbol("unset");
  /**
   * Given an input value, returns a constant getter function that can be used
   * inside of `useEffect` and friends without including it in the dependency array.
   *
   * This uses `options.diffed` in order to run before everything, even
   * ref assignment. This means this getter is safe to use anywhere ***except the render phase***.
   *
   * @param value
   * @returns
   */

  function useStableGetter(value) {
    const ref = useRef(Unset$1);
    useBeforeLayoutEffect(() => {
      ref.current = value;
    }, [value]);
    return useCallback(() => {
      if (ref.current === Unset$1) {
        throw new Error('Value retrieved from useStableGetter() cannot be called during render.');
      }

      return ref.current;
    }, []);
  }

  /**
   * Alternate useCallback() which always returns the same (wrapped) function reference
   * so that it can be excluded from the dependency arrays of `useEffect` and friends.
   *
   * Do not use during the render phase!  `useLayoutEffect` is fine though.
   */

  function useStableCallback(fn) {
    const currentCallbackGetter = useStableGetter(fn);
    return useCallback((...args) => {
      return currentCallbackGetter()(...args);
    }, []);
  }

  /**
   * Similar to `useState`, but for values that aren't "render-important" &ndash; updates don't cause a re-render and so the value shouldn't be used during render (though it certainly can, at least by re-rendering again).
   *
   * To compensate for this, you should pass a `useEffect`-esque callback that is run whenever the value changes.  Just like `useEffect`, this callback can return a cleanup function that's run before the value changes.  If you would like to re-render when the value changes (or, say, when the value meets some criteria), this is where you'll want to put in a call to a `setState` function.
   *
   * To summarize, it's like a `useState`-`useEffect` mashup:
   *
   * 1. It's like `useState`, except this version of `setState` doesn't re-render the whole component
   * 2. It's like `useState`, except you can run a function when the value changes that optionally returns a cleanup function
   * 3. It's like `useEffect`, except you trigger the effect function "remotely" instead of it running after rendering
   * 4. It's like `useEffect`, except the single "dependency" is based on your calls to `setState`
   *
   * Note that while calling `setState` doesn't cause any re-renders, you can do that within your `onChange` function, called whenever the value changes via that `setState`.
   *
   * @param onChange The "effect" function to run when the value changes. Effectively the same as `useEffect`'s "effect" function
   * @param initialValue If provided, the effect will be invoked once with this value on mount.
   * @returns
   */

  function usePassiveState(onChange, getInitialValue) {
    const valueRef = useRef(Unset);
    const warningRef = useRef(false);
    const cleanupCallbackRef = useRef(undefined); // Shared between "dependency changed" and "component unmounted".

    const onShouldCleanUp = useCallback(() => {
      let cleanupCallback = cleanupCallbackRef.current;
      if (cleanupCallback) cleanupCallback();
    }, []); // There are a couple places where we'd like to use our initial
    // value in place of having no value at all yet.
    // This is the shared code for that, used on mount and whenever
    // getValue is called.

    const tryEnsureValue = useStableCallback(() => {
      if (valueRef.current === Unset && getInitialValue != undefined) {
        try {
          var _onChange;

          const initialValue = getInitialValue();
          valueRef.current = initialValue;
          cleanupCallbackRef.current = (_onChange = onChange === null || onChange === void 0 ? void 0 : onChange(initialValue, undefined)) !== null && _onChange !== void 0 ? _onChange : undefined;
        } catch (ex) {// Exceptions are intentional to allow bailout (without exposing the Unset symbol)
        }
      }
    });
    const getValue = useStableCallback(() => {
      if (warningRef.current) console.warn("During onChange, prefer using the (value, prevValue) arguments instead of getValue -- it's ambiguous as to if you're asking for the old or new value at this point in time for this component."); // The first time we call getValue, if we haven't been given a value yet,
      // (and we were given an initial value to use)
      // return the initial value instead of nothing.

      if (valueRef.current === Unset) tryEnsureValue();
      return valueRef.current === Unset ? undefined : valueRef.current;
    });
    useLayoutEffect$1(() => {
      // Make sure we've run our effect at least once on mount.
      // (If we have an initial value, of course)
      tryEnsureValue();
    }, []); // The actual code the user calls to (possibly) run a new effect.

    const setValue = useStableCallback(arg => {
      const prevDep = getValue();
      const dep = arg instanceof Function ? arg(prevDep) : arg;

      if (dep !== valueRef.current) {
        var _onChange2;

        // Indicate to the user that they shouldn't call getValue during onChange
        warningRef.current = true; // Call any registerd cleanup function

        onShouldCleanUp();
        cleanupCallbackRef.current = (_onChange2 = onChange === null || onChange === void 0 ? void 0 : onChange(dep, prevDep)) !== null && _onChange2 !== void 0 ? _onChange2 : undefined;
        valueRef.current = dep; // Allow the user to normally call getValue again

        warningRef.current = false;
      }
    });
    return [getValue, setValue];
  }
  const Unset = Symbol();

  /**
   * Allows accessing the element a ref references as soon as it does so.
   * *This hook itself returns a hook*--useRefElementProps modifies the props that you were going to pass to an HTMLElement,
   * adding a RefCallback and merging it with any existing ref that existed on the props.
   *
   * Don't forget to provide the Element as the type argument!
   *
   * @returns The element, and the sub-hook that makes it retrievable.
   */

  function useRefElement({
    onElementChange
  }) {
    // Let us store the actual (reference to) the element we capture
    const [getElement, setElement] = usePassiveState(onElementChange, () => null); // Create a RefCallback that's fired when mounted 
    // and that notifies us of our element when we have it

    const myRef = useCallback(e => {
      if (e) setElement(() => e);
    }, []);
    const useRefElementProps = useCallback(props => useMergedProps()({
      ref: myRef
    }, props), []); // Return both the element and the hook that modifies 
    // the props and allows us to actually find the element

    return {
      useRefElementProps,
      getElement
    };
  }

  function useElementSize({
    observeBox,
    onSizeChange
  }) {
    const [getSize, setSize] = usePassiveState(onSizeChange);
    const currentObserveBox = useRef(observeBox);

    const needANewObserver = (element, observeBox) => {
      if (element) {
        const handleUpdate = () => {
          const {
            clientWidth,
            scrollWidth,
            offsetWidth,
            clientHeight,
            scrollHeight,
            offsetHeight,
            clientLeft,
            scrollLeft,
            offsetLeft,
            clientTop,
            scrollTop,
            offsetTop
          } = element;
          setSize({
            clientWidth,
            scrollWidth,
            offsetWidth,
            clientHeight,
            scrollHeight,
            offsetHeight,
            clientLeft,
            scrollLeft,
            offsetLeft,
            clientTop,
            scrollTop,
            offsetTop
          });
        };

        if (!("ResizeObserver" in window)) {
          document.addEventListener("resize", handleUpdate, {
            passive: true
          });
          return () => document.removeEventListener("resize", handleUpdate);
        } else {
          const observer = new ResizeObserver(entries => {
            handleUpdate();
          });
          observer.observe(element, {
            box: observeBox
          });
          currentObserveBox.current = observeBox;
          return () => observer.disconnect();
        }
      }
    };

    const {
      getElement,
      useRefElementProps
    } = useRefElement({
      onElementChange: e => needANewObserver(e, observeBox)
    });
    useEffect$1(() => {
      if (currentObserveBox.current !== observeBox) needANewObserver(getElement(), observeBox);
    }, [observeBox]);
    return {
      getElement,
      getSize,
      useElementSizeProps: useRefElementProps
    };
  }

  function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1);
  }
  /**
   * Inspects the element's style and determines the logical direction that text flows.
   *
   * Certain CSS properties, like `block-size`, respect the current writing mode and text direction.
   * But `transform`, `clip`, etc. don't.
   *
   * This is provided so that CSS properties can consistently use those logical properties.
   *
   * See https://drafts.csswg.org/css-writing-modes/#logical-to-physical
   *
   * @returns An object containing the following functions:
   * * `getLogicalDirection`: retrieves a `LogicalDirectionInfo` representing the current state of the element. (Function is constant between renders)
   * * `convertElementSize`: When used in conjunction with `useElementSize`, allows you to retrieve the logical size of an element instead of the physical size.
   * * `convertToLogicalOrientation`: Based on the current direction, converts "horizontal" or "vertical" to "inline" or "block".
   * * `convertToPhysicalOrientation`:  Based on the current direction, converts "inline" or "block" to "horizontal" or "vertical".
   */


  function useLogicalDirection({
    onLogicalDirectionChange
  }) {
    const updateLogicalInfo = useCallback(element => {
      var _element$parentElemen, _d;

      console.assert(element.isConnected);
      element = (_element$parentElemen = element.parentElement) !== null && _element$parentElemen !== void 0 ? _element$parentElemen : element;
      const computedStyles = window.getComputedStyle(element);
      let w = computedStyles.writingMode;
      let d = computedStyles.direction;
      let t = computedStyles.textOrientation;
      if (t == "upright") d = "ltr";
      setLogicalDirectionInfo({ ...WritingModes[w !== null && w !== void 0 ? w : "horizontal-tb"][(_d = d) !== null && _d !== void 0 ? _d : "ltr"]
      });
    }, []);
    const {
      getElement,
      useRefElementProps
    } = useRefElement({
      onElementChange: element => {
        if (element) {
          // The element hasn't actually been hooked up to the document yet.
          // Wait a moment so that we can properly use `getComputedStyle`
          // (since we only read it on mount)
          queueMicrotask(() => {
            updateLogicalInfo(element);
          });
        }
      }
    }); // TODO: There's no way to refresh which writing mode we have once mounted.
    //   A. There's no way to watch for CSS style changes
    //   B. Calling getComputedStyle after every render for every element gets expensive fast and
    //   C. Is not necessary for most use cases that will never switch writing-mode within a single component
    //      (Those that do will need to mount and unmount the component that uses it)
    //
    // As a solution, here's a cheap workaround that checks when the element's size has changed,
    // and if so, tests if the writing mode has changed too.
    //
    // This will work for at least some number of cases, but a better solution is still needed.

    const {
      useElementSizeProps
    } = useElementSize({
      onSizeChange: _ => updateLogicalInfo(getElement())
    });
    const [getLogicalDirectionInfo, setLogicalDirectionInfo] = usePassiveState(onLogicalDirectionChange);
    const convertToLogicalOrientation = useCallback((elementOrientation, direction) => {
      var _direction, _direction2;

      (_direction = direction) !== null && _direction !== void 0 ? _direction : direction = getLogicalDirectionInfo();
      if (((_direction2 = direction) === null || _direction2 === void 0 ? void 0 : _direction2.inlineOrientation) === elementOrientation) return "inline";
      return "block";
    }, []);
    const convertToPhysicalOrientation = useCallback((elementOrientation, direction) => {
      var _direction3;

      (_direction3 = direction) !== null && _direction3 !== void 0 ? _direction3 : direction = getLogicalDirectionInfo();

      if (elementOrientation == "inline") {
        var _direction4;

        if (((_direction4 = direction) === null || _direction4 === void 0 ? void 0 : _direction4.inlineOrientation) == "horizontal") return "horizontal";
        return "vertical";
      } else {
        var _direction5;

        if (((_direction5 = direction) === null || _direction5 === void 0 ? void 0 : _direction5.blockOrientation) == "vertical") return "vertical";
        return "horizontal";
      }
    }, []);
    const convertElementSize = useCallback((elementSize, direction) => {
      var _direction6;

      (_direction6 = direction) !== null && _direction6 !== void 0 ? _direction6 : direction = getLogicalDirectionInfo();

      if (direction) {
        const {
          inlineSize,
          blockSize,
          inlineDirection,
          blockDirection
        } = direction; // Size is relatively simple

        let clientInlineSize = elementSize[`client${capitalize(inlineSize)}`];
        let clientBlockSize = elementSize[`client${capitalize(blockSize)}`];
        let offsetInlineSize = elementSize[`offset${capitalize(inlineSize)}`];
        let offsetBlockSize = elementSize[`offset${capitalize(blockSize)}`];
        let scrollInlineSize = elementSize[`scroll${capitalize(inlineSize)}`];
        let scrollBlockSize = elementSize[`scroll${capitalize(blockSize)}`]; // Position requires us to sometimes use one property (like `left`)
        // or sometimes two (like `left` + `width`)

        function getPhysicalLeftTop(dir) {
          if (dir === "ltr" || dir == "rtl") return "left";
          return "top";
        }

        function getPhysicalRightBottom(dir) {
          if (dir === "rtl") return "width";
          if (dir === "btt") return "height";
          return null;
        }

        const f1 = getPhysicalLeftTop(inlineDirection);
        const f2 = getPhysicalRightBottom(inlineDirection);
        const f3 = getPhysicalLeftTop(blockDirection);
        const f4 = getPhysicalRightBottom(blockDirection);
        let clientInlineInset = elementSize[`client${capitalize(f1)}`] + (!f2 ? 0 : elementSize[`client${capitalize(f2)}`]);
        let scrollInlineInset = elementSize[`scroll${capitalize(f1)}`] + (!f2 ? 0 : elementSize[`scroll${capitalize(f2)}`]);
        let offsetInlineInset = elementSize[`offset${capitalize(f1)}`] == undefined ? undefined : elementSize[`offset${capitalize(f1)}`] + (!f2 ? 0 : elementSize[`offset${capitalize(f2)}`]);
        let clientBlockInset = elementSize[`client${capitalize(f3)}`] + (!f4 ? 0 : elementSize[`client${capitalize(f4)}`]);
        let scrollBlockInset = elementSize[`scroll${capitalize(f3)}`] + (!f4 ? 0 : elementSize[`scroll${capitalize(f4)}`]);
        let offsetBlockInset = elementSize[`offset${capitalize(f3)}`] == undefined ? undefined : elementSize[`offset${capitalize(f3)}`] + (!f4 ? 0 : elementSize[`offset${capitalize(f4)}`]);
        return {
          clientInlineSize,
          scrollInlineSize,
          offsetInlineSize,
          clientBlockSize,
          scrollBlockSize,
          offsetBlockSize,
          clientInlineInset,
          scrollInlineInset,
          offsetInlineInset,
          clientBlockInset,
          scrollBlockInset,
          offsetBlockInset
        };
      }

      return null;
    }, []);
    return {
      useLogicalDirectionProps: useCallback(props => useRefElementProps(useElementSizeProps(props)), []),
      getElement,
      getLogicalDirectionInfo,
      convertElementSize,
      convertToLogicalOrientation,
      convertToPhysicalOrientation
    };
  }
  const HorizontalTbLtr = {
    inlineDirection: "ltr",
    blockDirection: "ttb",
    inlineOrientation: "horizontal",
    blockOrientation: "vertical",
    inlineSize: "width",
    blockSize: "height",
    leftRightDirection: "ltr",
    overUnderDirection: "ttb"
  };
  const HorizontalTbRtl = { ...HorizontalTbLtr,
    inlineDirection: "rtl"
  };
  const VerticalRlLtr = {
    inlineDirection: "ttb",
    blockDirection: "rtl",
    inlineOrientation: "vertical",
    blockOrientation: "horizontal",
    inlineSize: "height",
    blockSize: "width",
    leftRightDirection: "ttb",
    overUnderDirection: "rtl"
  };
  const VerticalRlRtl = { ...VerticalRlLtr,
    inlineDirection: "btt"
  };
  const SidewaysRlLtr = { ...VerticalRlLtr
  };
  const SidewaysRlRtl = { ...VerticalRlRtl
  };
  const VerticalLrLtr = { ...VerticalRlLtr,
    blockDirection: "ltr"
  };
  const VerticalLrRtl = { ...VerticalRlRtl,
    blockDirection: "ltr"
  };
  const SidewaysLtLtr = { ...VerticalLrLtr,
    inlineDirection: "btt",
    leftRightDirection: "btt",
    overUnderDirection: "ltr"
  };
  const SidewaysLtRtl = { ...SidewaysLtLtr,
    inlineDirection: "ttb"
  };
  const HorizontalTb = {
    ltr: HorizontalTbLtr,
    rtl: HorizontalTbRtl
  };
  const VerticalRl = {
    ltr: VerticalRlLtr,
    rtl: VerticalRlRtl
  };
  const VerticalLr = {
    ltr: VerticalLrLtr,
    rtl: VerticalLrRtl
  };
  const SidewaysRl = {
    ltr: SidewaysRlLtr,
    rtl: SidewaysRlRtl
  };
  const SidewaysLr = {
    ltr: SidewaysLtLtr,
    rtl: SidewaysLtRtl
  };
  const WritingModes = {
    "horizontal-tb": HorizontalTb,
    "vertical-lr": VerticalLr,
    "vertical-rl": VerticalRl,
    "sideways-lr": SidewaysLr,
    "sideways-rl": SidewaysRl
  };

  /**
   * Wrap the native `useEffect` to add arguments
   * that allow accessing the previous value as the first argument,
   * as well as the changes that caused the hook to be called as the second argument.
   *
   * @param effect
   * @param inputs
   * @param impl You can choose whether to use `useEffect` or `useLayoutEffect` by
   * passing one of them as this argument. By default, it's `useEffect`.
   */

  function useEffect(effect, inputs, impl = useEffect$1) {
    const prevInputs = useRef(undefined);

    const effect2 = () => {
      let changes = [];

      if (inputs && prevInputs.current) {
        for (let i = 0; i < Math.max(prevInputs.current.length, inputs.length); ++i) {
          if (prevInputs.current[i] != inputs[i]) changes[i] = {
            from: prevInputs.current[i],
            to: inputs[i]
          };
        }
      }

      const ret = effect(prevInputs.current, changes);
      prevInputs.current = inputs;
      return ret;
    };

    impl(effect2, inputs);
  }

  /**
   * Wrap the native `useLayoutEffect` to add arguments
   * that allow accessing the previous value as the first argument,
   * as well as the changes that caused the hook to be called as the second argument.
   *
   * @param effect
   * @param inputs
   */

  function useLayoutEffect(effect, inputs) {
    return useEffect(effect, inputs, useLayoutEffect$1);
  }

  function useTimeout({
    timeout,
    callback,
    triggerIndex
  }) {
    const stableCallback = useStableCallback(() => {
      startTimeRef.current = null;
      callback();
    });
    const getTimeout = useStableGetter(timeout); // Set any time we start timeout.
    // Unset any time the timeout completes

    const startTimeRef = useRef(null);
    const timeoutIsNull = timeout == null; // Any time the triggerIndex changes (including on mount)
    // restart the timeout.  The timeout does NOT reset
    // when the duration or callback changes, only triggerIndex.

    useEffect$1(() => {
      let timeout = getTimeout();
      console.assert(timeoutIsNull == (timeout == null));

      if (timeout != null) {
        startTimeRef.current = +new Date();
        const handle = setTimeout(stableCallback, timeout);
        return () => clearTimeout(handle);
      }
    }, [triggerIndex, timeoutIsNull]);
    const getElapsedTime = useCallback(() => {
      var _startTimeRef$current;

      return +new Date() - +((_startTimeRef$current = startTimeRef.current) !== null && _startTimeRef$current !== void 0 ? _startTimeRef$current : new Date());
    }, []);
    const getRemainingTime = useCallback(() => {
      const timeout = getTimeout();
      return timeout == null ? null : Math.max(0, timeout - getElapsedTime());
    }, []);
    return {
      getElapsedTime,
      getRemainingTime
    };
  }

  /**
   * Given an asyncronous event handler, returns a syncronous one that works on the DOM,
   * along with some other information related to the current state.
   * Does not modify any props.
   *
   * Note that because the handler you provide may be called with a delay, and
   * because the value of, e.g., an `<input>` element will likely be stale by the
   * time the delay is over, a `capture` function is necessary in order to
   * capture the relevant information from the DOM. Any other simple event data,
   * like `mouseX` or `shiftKey` can stay on the event itself and don't
   * need to be captured &ndash; it's never stale.
   *
   * ```tsx
   * const syncOnInput = async (value: number, e: Event) => {
   *     [...] // Ex. send to a server and setState when done
   * };
   * const {
   *     // When called, returns the synchronous event handler
   *     getSyncHandler,
   *     // True while the handler is running
   *     pending,
   *     // The error thrown, if any
   *     error,
   *     // Show this value while the operation's pending
   *     currentCapture,
   *     // And others, see `UseAsyncHandlerReturnType`
   *     ...rest
   * } = useAsyncHandler<HTMLInputElement>()({
   *     // Pass in the capture function that saves event data
   *     // from being stale.  Note that the async event handler
   *     // isn't passed here, it's passed to `getSyncHandler` above.
   *     capture: e => {
   *         e.preventDefault();
   *
   *         // Save this value so that it's never stale
   *         return e.currentTarget.valueAsNumber;
   *     }
   * });
   *
   * const onInput = getSyncHandler(someAsyncFunction);
   * // OR the following, if you want the input entirely disabled while pending:
   * const onInput = getSyncHandler(pending? null : someAsyncFunction);
   * ```
   *
   * The handler is automatically throttled to only run one at a time.
   * If the handler is called, and then before it finishes, is called again,
   * it will be put on hold until the current one finishes, at which point
   * the second one will run.  If the handler is called a third time before
   * the first has finished, it will *replace* the second, so only the most
   * recently called iteration of the handler will run.
   *
   *
   * You may optionally *also* specify a debounce parameter that waits until the
   * syncronous handler has not been called for the specified number of
   * milliseconds, at which point we *actually* run the asyncronous handler
   * according to the logic in the previous paragraph. This is in
   * *addition* to throttling the handler, and does not replace that behavior.
   */

  function useAsyncHandler() {
    return function ({
      capture,
      debounce
    }) {
      // Always represents whatever promise is currently being waited on, or null if none.
      const [promise, setPromise, getPromise] = useState(null); // Keep track of how many times we've actually called the async handler

      const [runCount, setRunCount] = useState(0);
      const [resolveCount, setResolveCount] = useState(0);
      const [rejectCount, setRejectCount] = useState(0); // 

      const [currentType, setCurrentType] = useState(null); // If we're set to use a debounce, then when the timeout finishes,
      // the promise from this state object is transferred over to either 
      // the current promise or the pending promise.

      const [debouncedPromiseStarter, setDebouncedPromiseStarter, getDebouncedPromiseStarter] = useState(null); // When we want to start a new promise, we won't allow it to start if one is still running.
      // In that case, we store the promise (or rather, a way to start the promise) in state.

      const [pendingPromiseStarter, setPendingPromiseStarter, getPendingPromiseStarter] = useState(null); // We need to differentiate between `undefined` and "no error has been thrown".

      const [error, setError, getError] = useState(undefined);
      const [hasError, setHasError, getHasError] = useState(false); // Same thing, we need to differentiate between "nothing captured yet" and "`undefined` was captured"

      const [currentCapture, setCurrentCapture, getCurrentCapture] = useState(undefined);
      const [hasCapture, setHasCapture] = useState(false); // When the debounce timer is up (or we manually request the debounce to end)
      // run the normal "please consider running this promise" routine that we would
      // have just run immediately if we weren't debouncing our promises.

      const onDebounceTimeUp = useCallback(() => {
        const debouncedPromiseStarter = getDebouncedPromiseStarter();
        if (debouncedPromiseStarter) wantToStartANewPromise(debouncedPromiseStarter);
        setDebouncedPromiseStarter(null);
      }, [wantToStartANewPromise, setDebouncedPromiseStarter]); // Handle the debounce. Logically this happens before the main step as a sort of step 0.
      // Resets the timeout any time the handler was requested to be called again
      // and when it finishes, actually call the handler (or set it as the pending promise)

      useTimeout({
        timeout: debounce !== null && debounce !== void 0 ? debounce : null,
        callback: onDebounceTimeUp,
        triggerIndex: debouncedPromiseStarter
      }); // See if we should set our current promise to be whatever the pending promise is
      // (usually because the current promise finished and became null).

      useLayoutEffect(() => {
        // Our current promise just finished and there's one waiting?
        if (promise == null && pendingPromiseStarter != null) {
          wantToStartANewPromise(pendingPromiseStarter);
          setPendingPromiseStarter(null);
        }
      }, [promise, pendingPromiseStarter]); // Called any time the async handler is about to be called for whatever reason,
      // except for debounce, which comes first, as a sort of "step 0".
      // Handles all the necessary boilerplate related to choosing whether to
      // run or set as pending, resetting state variables, etc.

      function wantToStartANewPromise(startPromise) {
        let alreadyRunningPromise = getPromise() != null; // Boilerplate wrapper around the given promise starter

        let startPromiseWithBoilerplate = () => {
          // When it starts, notify the caller
          setRunCount(r => ++r); // When it completes, notify the caller
          // When it fails, save the error and notify the caller
          // When it settles, reset our state so we can run a pending promise if it exists

          const onThen = () => {
            setResolveCount(c => ++c);
          };

          const onCatch = ex => {
            setError(ex);
            setHasError(true);
            setRejectCount(c => ++c);
          };

          const onFinally = () => {
            setPromise(null);
          }; // Handle the special case where the handler is synchronous


          let result;

          try {
            result = startPromise();

            if (result == undefined) {
              // It's synchronous and returned successfully.
              // Bail out early.
              onThen();
              onFinally();
              setCurrentType("sync");
              return;
            }

            console.assert("then" in result);
          } catch (ex) {
            // It's synchronous (or asynchronous but didn't await anything yet) and threw an error.
            // Bail out early.
            onCatch(ex);
            onFinally();
            setCurrentType("sync");
            return;
          } // The handler is asynchronous


          setCurrentType("async");
          return (async () => {
            await result;
          })().then(onThen).catch(onCatch).finally(onFinally);
        };

        if (!alreadyRunningPromise) {
          // Start the promise immediately, because there wasn't one running already.
          let nextPromise = startPromiseWithBoilerplate();

          if (nextPromise == undefined) ; else {
            setError(undefined);
            setHasError(false);
            setPromise(nextPromise);
          }
        } else {
          // Don't start the promise yet, 
          // and allow it to start in the future instead.
          setPendingPromiseStarter(_ => startPromiseWithBoilerplate);
        }
      }

      let ret = {
        getSyncHandler,
        getCurrentCapture,
        callCount: runCount,
        currentCapture,
        hasCapture,
        pending: promise != null,
        hasError,
        error,
        currentType,
        flushDebouncedPromise: onDebounceTimeUp,
        resolveCount,
        rejectCount,
        settleCount: rejectCount + resolveCount
      };
      return ret;

      function getSyncHandler(asyncHandler) {
        const syncHandler = useStableCallback(function syncHandler(event) {
          if (asyncHandler == null) return; // Get the most significant information from the event at this time,
          // which is necessary since the promise could actually be called much later
          // when the element's value (etc.) has changed.

          const captured = capture(event);
          setCurrentCapture(captured);
          setHasCapture(true);

          const startPromise = () => asyncHandler(captured, event);

          if (debounce == null) {
            wantToStartANewPromise(startPromise);
          } else {
            setDebouncedPromiseStarter(_ => startPromise);
          }
        });
        return asyncHandler == null ? undefined : syncHandler;
      }
    };
  }

  /**
   * When used in tandem with `useRovingTabIndex`, allows control of
   * the tabbable index with the arrow keys.
   *
   * @see useListNavigation, which packages everything up together.
   */

  function useLinearNavigation({
    index,
    navigateToFirst,
    navigateToLast,
    navigateToNext,
    navigateToPrev,
    managedChildren,
    navigationDirection,
    disableArrowKeys,
    disableHomeEndKeys
  }) {
    var _navigationDirection;

    (_navigationDirection = navigationDirection) !== null && _navigationDirection !== void 0 ? _navigationDirection : navigationDirection = "either";
    const childCount = managedChildren.length; // Make sure the tabbable index never escapes the bounds of all available children
    // TODO: Keep track of the original index and keep it, at least until keyboard navigation.

    useLayoutEffect(() => {
      if (index !== null) {
        if (index < 0) {
          navigateToFirst();
        } else if (childCount > 0 && index >= childCount) {
          navigateToLast();
        }
      }
    }, [index, childCount, navigateToFirst, navigateToLast]); // These allow us to manipulate what our current tabbable child is.

    /*const navigateToIndex = useCallback((index: number) => { setIndex(index < 0 ? (managedChildren.length + index) : index); }, []);
    const navigateToNext = useCallback(() => { setIndex((i: number | null) => i === null? null! : i >= managedChildren.length - 1? managedChildren.length - 1 : ++i); }, []);
    const navigateToPrev = useCallback(() => { setIndex((i: number | null) => i === null? null! : i < 0? 0 : --i); }, []);
    const navigateToStart = useCallback(() => { navigateToIndex(0); }, [navigateToIndex]);
    const navigateToEnd = useCallback(() => { navigateToIndex(-1); }, [navigateToIndex]);*/

    const useLinearNavigationChild = useCallback(({
      index
    }) => {
      const getIndex = useStableGetter(index); // Prefer the parent element's direction so that we're not calling getComputedStyle
      // on every single individual child, which is likely redundant.

      const {
        convertElementSize,
        getLogicalDirectionInfo,
        useLogicalDirectionProps
      } = useLogicalDirection({});

      const useLinearNavigationChildProps = props => {
        const onKeyDown = e => {
          // Not handled by typeahead (i.e. assume this is a keyboard shortcut)
          if (e.ctrlKey || e.metaKey) return;
          getIndex();
          const info = getLogicalDirectionInfo();
          let allowsBlockNavigation = navigationDirection == "block" || navigationDirection == "either";
          let allowsInlineNavigation = navigationDirection == "inline" || navigationDirection == "either";

          switch (e.key) {
            case "ArrowUp":
              {
                const propName = (info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? "blockDirection" : "inlineDirection";
                const directionAllowed = !disableArrowKeys && ((info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? allowsBlockNavigation : allowsInlineNavigation);

                if (directionAllowed) {
                  if ((info === null || info === void 0 ? void 0 : info[propName]) === "btt") {
                    navigateToNext();
                  } else {
                    navigateToPrev();
                  }

                  e.preventDefault();
                  e.stopPropagation();
                }

                break;
              }

            case "ArrowDown":
              {
                const propName = (info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? "blockDirection" : "inlineDirection";
                const directionAllowed = !disableArrowKeys && ((info === null || info === void 0 ? void 0 : info.blockOrientation) === "vertical" ? allowsBlockNavigation : allowsInlineNavigation);

                if (directionAllowed) {
                  if ((info === null || info === void 0 ? void 0 : info[propName]) === "btt") {
                    navigateToPrev();
                  } else {
                    navigateToNext();
                  }

                  e.preventDefault();
                  e.stopPropagation();
                }

                break;
              }

            case "ArrowLeft":
              {
                const propName = (info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? "inlineDirection" : "blockDirection";
                const directionAllowed = !disableArrowKeys && ((info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? allowsInlineNavigation : allowsBlockNavigation);

                if (directionAllowed) {
                  if ((info === null || info === void 0 ? void 0 : info[propName]) === "rtl") {
                    navigateToNext();
                  } else {
                    navigateToPrev();
                  }

                  e.preventDefault();
                  e.stopPropagation();
                }

                break;
              }

            case "ArrowRight":
              {
                const propName = (info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? "inlineDirection" : "blockDirection";
                const directionAllowed = !disableArrowKeys && ((info === null || info === void 0 ? void 0 : info.inlineOrientation) === "horizontal" ? allowsInlineNavigation : allowsBlockNavigation);

                if (directionAllowed) {
                  if ((info === null || info === void 0 ? void 0 : info[propName]) === "rtl") {
                    navigateToPrev();
                  } else {
                    navigateToNext();
                  }

                  e.preventDefault();
                  e.stopPropagation();
                }

                e.preventDefault();
                e.stopPropagation();
                break;
              }

            case "Home":
              if (!disableHomeEndKeys) {
                navigateToFirst();
                e.preventDefault();
                e.stopPropagation();
              }

              break;

            case "End":
              if (!disableHomeEndKeys) {
                navigateToLast();
                e.preventDefault();
                e.stopPropagation();
              }

              break;
          }
        };

        return useLogicalDirectionProps(useMergedProps()({
          onKeyDown
        }, props));
      };

      return {
        useLinearNavigationChildProps
      };
    }, [navigationDirection, navigateToNext, navigateToPrev, navigateToFirst, navigateToLast, !!disableArrowKeys, !!disableHomeEndKeys]);
    return {
      useLinearNavigationChild
    };
  }
  /**
   * Allows for the selection of a managed child by typing the given text associated with it.
   *
   * @see useListNavigation, which packages everything up together.
   */

  function useTypeaheadNavigation({
    collator,
    getIndex,
    typeaheadTimeout,
    setIndex
  }) {
    // For typeahead, keep track of what our current "search" string is (if we have one)
    // and also clear it every 1000 ms since the last time it changed.
    // Next, keep a mapping of typeahead values to indices for faster searching.
    // And, for the user's sake, let them know when their typeahead can't match anything anymore
    const [currentTypeahead, setCurrentTypeahead, getCurrentTypeahead] = useState(null);
    useTimeout({
      timeout: typeaheadTimeout !== null && typeaheadTimeout !== void 0 ? typeaheadTimeout : 1000,
      callback: () => {
        setCurrentTypeahead(null);
        setInvalidTypeahead(null);
      },
      triggerIndex: currentTypeahead
    });
    const sortedTypeaheadInfo = useRef([]);
    const [invalidTypeahead, setInvalidTypeahead] = useState(false); // Handle typeahead for input method editors as well
    // Essentially, when active, ignore further keys 
    // because we're waiting for a CompositionEnd event

    const [imeActive, setImeActive, getImeActive] = useState(false); // Because composition events fire *after* keydown events 
    // (but within the same task, which, TODO, could be browser-dependent),
    // we can use this to keep track of which event we're listening for on the first keydown.

    const [nextTypeaheadChar, setNextTypeaheadChar] = useState(null);
    useLayoutEffect(() => {
      if (nextTypeaheadChar !== null) {
        setCurrentTypeahead(typeahead => (typeahead !== null && typeahead !== void 0 ? typeahead : "") + nextTypeaheadChar);
        setNextTypeaheadChar(null);
      }
    }, [nextTypeaheadChar]);
    const comparator = useStableCallback((lhs, rhs) => {
      let compare;

      if (typeof lhs === "string" && typeof rhs.text === "string") {
        var _safeRhs$toLowerCase;

        // For the purposes of typeahead, only compare a string of the same size as our currently typed string.
        // By normalizing them first, we ensure this byte-by-byte handling of raw character data works out okay.
        let safeLhs = lhs.normalize("NFD");
        let safeRhs = rhs.text.normalize("NFD").substr(0, safeLhs.length);
        if (collator) compare = collator.compare(safeLhs, safeRhs);else compare = safeLhs.toLowerCase().localeCompare((_safeRhs$toLowerCase = safeRhs.toLowerCase()) !== null && _safeRhs$toLowerCase !== void 0 ? _safeRhs$toLowerCase : "");
        return compare;
      }

      return lhs - rhs;
    }); // Handle changes in typeahead that cause changes to the tabbable index

    useEffect$1(() => {
      if (currentTypeahead && sortedTypeaheadInfo.current.length) {
        let sortedTypeaheadIndex = binarySearch(sortedTypeaheadInfo.current, currentTypeahead, comparator);

        if (sortedTypeaheadIndex < 0) {
          // The user has typed an entry that doesn't exist in the list
          // (or more specifically "for which there is no entry that starts with that input")
          setInvalidTypeahead(true);
        } else {
          setInvalidTypeahead(false);
          /*
            We know roughly where, in the sorted array of strings, our next typeahead location is.
            But roughly isn't good enough if there are multiple matches.
            To convert our sorted index to the unsorted index we need, we have to find the first
            element that matches us *and* (if any such exist) is *after* our current selection.
              In other words, the only way typeahead moves backwards relative to our current
            position is if the only other option is behind us.
              It's not specified in WAI-ARIA what to do in that case.  I suppose wrap back to the start?
            Though there's also a case for just going upwards to the nearest to prevent jumpiness.
            But if you're already doing typeahead on an unsorted list, like, jumpiness can't be avoided.
            I dunno. Going back to the start is the simplist though.
              Basically what this does: Starting from where we found ourselves after our binary search,
            scan backwards and forwards through all adjacent entries that also compare equally so that
            we can find the one whose `unsortedIndex` is the lowest amongst all other equal strings
            (and also the lowest `unsortedIndex` yadda yadda except that it comes after us).
              TODO: The binary search starts this off with a solid O(log n), but one-character
            searches are, thanks to pigeonhole principal, eventually guaranteed to become
            O(n*log n). This is annoying but probably not easily solvable? There could be an
            exception for one-character strings, but that's just kicking the can down
            the road. Maybe one or two characters would be good enough though.
          */
          // These are used to keep track of the candidates' positions in both our sorted array and the unsorted DOM.

          let lowestUnsortedIndexAll = null;
          let lowestSortedIndexAll = sortedTypeaheadIndex; // These two are only set for elements that are ahead of us, but the principle's the same otherwise

          let lowestUnsortedIndexNext = null;
          let lowestSortedIndexNext = sortedTypeaheadIndex;

          const updateBestFit = u => {
            var _getIndex;

            if (lowestUnsortedIndexAll == null || u < lowestUnsortedIndexAll) {
              lowestUnsortedIndexAll = u;
              lowestSortedIndexAll = i;
            }

            if ((lowestUnsortedIndexNext == null || u < lowestUnsortedIndexNext) && u > ((_getIndex = getIndex()) !== null && _getIndex !== void 0 ? _getIndex : -Infinity)) {
              lowestUnsortedIndexNext = u;
              lowestSortedIndexNext = i;
            }
          };

          let i = sortedTypeaheadIndex;

          while (i >= 0 && comparator(currentTypeahead, sortedTypeaheadInfo.current[i]) == 0) {
            updateBestFit(sortedTypeaheadInfo.current[i].unsortedIndex);
            --i;
          }

          i = sortedTypeaheadIndex;

          while (i < sortedTypeaheadInfo.current.length && comparator(currentTypeahead, sortedTypeaheadInfo.current[i]) == 0) {
            updateBestFit(sortedTypeaheadInfo.current[i].unsortedIndex);
            ++i;
          }

          if (lowestUnsortedIndexNext !== null) setIndex(sortedTypeaheadInfo.current[lowestSortedIndexNext].unsortedIndex);else if (lowestUnsortedIndexAll !== null) setIndex(sortedTypeaheadInfo.current[lowestSortedIndexAll].unsortedIndex);
        }
      }
    }, [currentTypeahead]);
    const useTypeaheadNavigationChild = useCallback(({
      text,
      ...i
    }) => {
      useEffect$1(() => {
        if (text) {
          // Find where to insert this item.
          // Because all index values should be unique, the returned sortedIndex
          // should always refer to a new location (i.e. be negative)                
          let sortedIndex = binarySearch(sortedTypeaheadInfo.current, text, comparator);
          console.assert(sortedIndex < 0);

          if (sortedIndex < 0) {
            sortedTypeaheadInfo.current.splice(-sortedIndex - 1, 0, {
              text,
              unsortedIndex: i.index
            });
          }

          return () => {
            // When unmounting, find where we were and remove ourselves.
            // Again, we should always find ourselves because there should be no duplicate values if each index is unique.
            let sortedIndex = binarySearch(sortedTypeaheadInfo.current, text, comparator);
            console.assert(sortedIndex >= 0);

            if (sortedIndex >= 0) {
              sortedTypeaheadInfo.current.splice(sortedIndex, 1);
            }
          };
        }
      }, [text]);

      const useTypeaheadNavigationChildProps = function ({ ...props
      }) {
        const onCompositionStart = e => {
          setImeActive(true);
        };

        const onCompositionEnd = e => {
          setNextTypeaheadChar(e.data);
          setImeActive(false);
        };

        const onKeyDown = e => {
          const imeActive = getImeActive();
          let key = e.key; // Not handled by typeahead (i.e. assume this is a keyboard shortcut)

          if (e.ctrlKey || e.metaKey) return;

          if (!imeActive && e.key === "Backspace") {
            // Remove the last character in a way that doesn't split UTF-16 surrogates.
            setCurrentTypeahead(t => t === null ? null : [...t].reverse().slice(1).reverse().join(""));
            e.preventDefault();
            e.stopPropagation();
            return;
          } // The key property represents the typed character OR the "named key attribute" of the key pressed.
          // There's no definite way to tell the difference, but for all intents and purposes
          // there are no one-character names, and there are no non-ASCII-alpha names.
          // Thus, any one-character or non-ASCII value for `key` is *almost certainly* a typed character.


          const isCharacterKey = key.length === 1 || !/^[A-Za-z]/.test(key);

          if (isCharacterKey) {
            var _getCurrentTypeahead;

            if (key == " " && ((_getCurrentTypeahead = getCurrentTypeahead()) !== null && _getCurrentTypeahead !== void 0 ? _getCurrentTypeahead : "").trim().length == 0) ; else {
              e.preventDefault();
              e.stopPropagation(); // Note: Won't be true for the first keydown
              // but will be overwritten before useLayoutEffect is called
              // to actually apply the change

              if (!imeActive) setNextTypeaheadChar(key);
            }
          }
        };

        return useMergedProps()({
          onKeyDown,
          onCompositionStart,
          onCompositionEnd
        }, props);
      };

      return {
        useTypeaheadNavigationChildProps
      };
    }, []);
    return {
      useTypeaheadNavigationChild,
      currentTypeahead,
      invalidTypeahead
    };
  }
  /**
   * Your usual binary search implementation.
   *
   * It's used here to quickly find a good spot to start searching for our next typeahead candidate.
   * @param array The array to search through
   * @param wanted The value you'd like to find
   * @param comparator Compares `wanted` with the current value in `array`
   * @returns A non-negative value if `wanted` was found, and a negative number if not.
   * The absolute value of this number, minus one, is where `wanted` *would* be found if it *was* in `array`
   */

  function binarySearch(array, wanted, comparator) {
    var firstIndex = 0;
    var lastIndex = array.length - 1;

    while (firstIndex <= lastIndex) {
      var testIndex = lastIndex + firstIndex >> 1;
      var comparisonResult = comparator(wanted, array[testIndex]);

      if (comparisonResult > 0) {
        firstIndex = testIndex + 1;
      } else if (comparisonResult < 0) {
        lastIndex = testIndex - 1;
      } else {
        return testIndex;
      }
    }

    return -firstIndex - 1;
  }

  /**
   * Allows a parent component to access information about certain
   * child components once they have rendered.
   *
   * This hook is slightly more complicated in that it returns both a
   * prop-modifying hook, but also a hook that each child will need
   * to use: `useManagedChild`.  It's stable across renders, so just
   * toss it into a `Context` so the children can have access to it.
   * This function registers the child with the parent and provides
   * it with any requested information, but doesn't do anything else
   * until it unmounts and retracts that information.
   */

  function useChildManager() {
    // This is blindly updated any time a child mounts or unmounts itself.
    // Used to make sure that any time the array of managed children updates,
    // we also re-render.
    const [childUpdateIndex, setChildUpdateIndex] = useState(0);
    const [totalChildrenMounted, setTotalChildrenMounted, getTotalChildrenMounted] = useState(0);
    const [totalChildrenUnounted, setTotalChildrenUnounted, getTotalChildrenUnounted] = useState(0);
    const childrenCurrentlyMounted = totalChildrenMounted - totalChildrenUnounted;
    const managedChildren = useRef([]
    /** TODO: Any problems caused by using an array when it should be an object? */
    );
    const mountedChildren = useRef([]);
    const mountOrder = useRef(new Map());
    const indicesByElement = useRef(new Map());
    const deletedIndices = useRef(new Set()); // Used to keep track of indices that have "over-mounted" and by how much.
    // We need this so that we don't erase saved information when a component
    // "overmounts" over another which then, correctly, switches *itself* to something else.
    // In general, this should only happen when components are swapping between indices.
    // By the time they're done, this map should be all 0s again, at which point
    // it's okay to actually run the unmount code.
    // 
    // TODO: throw a console.assert somewhere to make up for the lost 
    // "are you sure you want to overwrite this child's index!" assertion.
    // Namely, is this map all 0s when the parent element re-renders? 
    // Probably not because of setChildUpdateIndex

    const overmountCount = useRef(new Map());
    const getMountIndex = useCallback(index => {
      return mountOrder.current.get(index);
    }, []);
    const useManagedChild = useCallback(info => {
      const [element, onElementChange] = useState(null);
      const {
        getElement,
        useRefElementProps
      } = useRefElement({
        onElementChange
      });
      useLayoutEffect(() => {
        let index = getTotalChildrenMounted();
        mountOrder.current.set(info.index, index);
        mountedChildren.current[index] = info;
        setTotalChildrenMounted(t => ++t);
        return () => {
          mountOrder.current.delete(info.index);
          mountedChildren.current[index] = null;
          setTotalChildrenUnounted(t => ++t);
        };
      }, [info.index]); // As soon as the component mounts, notify the parent and request a rerender.

      useLayoutEffect((prev, changes) => {
        if (element) {
          indicesByElement.current.set(element, info.index);
          deletedIndices.current.delete(info.index);

          if (managedChildren.current[info.index] != undefined) {
            var _overmountCount$curre;

            overmountCount.current.set(info.index, ((_overmountCount$curre = overmountCount.current.get(info.index)) !== null && _overmountCount$curre !== void 0 ? _overmountCount$curre : 0) + 1);
          }

          setChildUpdateIndex(c => ++c);
          managedChildren.current[info.index] = { ...info
          };
          return () => {
            var _overmountCount$curre2;

            setChildUpdateIndex(c => ++c);

            if (((_overmountCount$curre2 = overmountCount.current.get(info.index)) !== null && _overmountCount$curre2 !== void 0 ? _overmountCount$curre2 : 0) > 0) {
              var _overmountCount$curre3;

              overmountCount.current.set(info.index, ((_overmountCount$curre3 = overmountCount.current.get(info.index)) !== null && _overmountCount$curre3 !== void 0 ? _overmountCount$curre3 : 0) - 1);
            } else {
              delete managedChildren.current[info.index];
              deletedIndices.current.add(info.index);

              if (typeof info.index === "number") {
                while (managedChildren.current.length && managedChildren.current[managedChildren.current.length - 1] === undefined) managedChildren.current.length -= 1;
              }

              indicesByElement.current.delete(element);
            }
          };
        }
      }, [element, info.index]); // Any time our child props change, make that information available generally.
      // *Don't re-render*, otherwise we'd be stuck in an
      // infinite loop every time an anonymous function is passed.
      // It comes in from the props so the child was already updated by it --
      // we don't need the parent to re-render every single child any time
      // "onClick" updates or whatever.  The relevant child already knows,
      // and that's what matters.

      useLayoutEffect(() => {
        if (managedChildren.current[info.index] != undefined) managedChildren.current[info.index] = { ...info
        };
      }, [...Object.entries(info).flat()]);
      return {
        element,
        getElement,
        useManagedChildProps: useRefElementProps
      };
    }, []);
    return {
      useManagedChild,
      childCount: childrenCurrentlyMounted,
      managedChildren: managedChildren.current,
      mountedChildren: mountedChildren.current,
      indicesByElement: indicesByElement.current,
      totalChildrenMounted,
      totalChildrenUnounted,
      getMountIndex,
      deletedIndices: deletedIndices.current
    };
  }
  /**
   * Helper function for letting children know when they are or are not the
   * current selected/expanded/focused/whatever child.
   *
   * Automatically handles when children are mounted & unmounted and such.
   *
   * While it will be called once for every child on mount, after that setFlag
   * is guaranteed to only be called once on activation and once on deactivation,
   * so it's generally safe to put side effects inside if necessary.
   * It's also safe to make it non-stable.
   *
   * @param activatedIndex What index the current selected (etc.) child is
   * @param length How many children exist (as managedChildren.length)
   * @param setFlag A function that probably looks like (i, flag) => managedChildren[i].setActive(flag)
   * @param useEffect Which version of useEffect to use. Default is `useLayoutEffect`.
   */

  function useChildFlag({
    activatedIndex,
    closestFit,
    managedChildren,
    setChildFlag,
    getChildFlag,
    useEffect
  }) {
    var _useEffect;

    (_useEffect = useEffect) !== null && _useEffect !== void 0 ? _useEffect : useEffect = useLayoutEffect;
    if (closestFit) console.assert(typeof activatedIndex == "number" || activatedIndex == null); // Whenever we re-render, make sure that any children that have mounted
    // have their flags properly set.  We know it's unset if it was null,
    // in which case we just set it to true or false.
    //
    // And, I mean, as long as we're already iterating through every child
    // on every render to check for newly mounted children, might as well
    // just handle changed in the activatedIndex here too.

    useEffect(() => {
      // TODO: We have limited information about when a child mounts or unmounts
      // and so we don't know where to look for any null entries that need changing.
      // We know when activatedIndex changes and what it was, but not much else.
      // Looping over every child *works*, and it's not an expensive loop by any means,
      // but, like, eugh.
      // Also, before we do anything, see if we need to "correct" activatedIndex.
      // It could be pointing to a child that doesn't exist, and if closestFit is given,
      // we need to adjust activatedIndex to point to a valid child.
      if (typeof activatedIndex == "number" && Array.isArray(managedChildren) && managedChildren[activatedIndex] == null) {
        // Oh dear. Are we actively correcting this?
        if (closestFit) {
          // Oh dear.
          // Search up and down the list of children for any that actually exist.
          let searchHigh = activatedIndex + 1;
          let searchLow = activatedIndex - 1;

          while (searchLow >= 0 && managedChildren[searchLow] == null || searchHigh < managedChildren.length && managedChildren[searchHigh] == null) {
            ++searchHigh;
            --searchLow;
          }

          if (searchLow >= 0 && managedChildren[searchLow] != null) {
            activatedIndex = searchLow;
          } else if (searchHigh < managedChildren.length && managedChildren[searchHigh] != null) {
            activatedIndex = searchHigh;
          } // Now that we've done that, if any valid children exist, we've reset activatedIndex to point to it instead.
          // Now we'll fall through to the for loop set and unset our flags based on this "corrected" value.
          //
          // We don't correct it or save it anywhere because we'd very much like to return to it
          // if the child remounts itself.

        }
      }

      if (Array.isArray(managedChildren)) {
        for (let i = 0; i < managedChildren.length; ++i) {
          let shouldBeSet = i == activatedIndex;

          if (getChildFlag(i) != shouldBeSet) {
            setChildFlag(i, shouldBeSet);
          }
        }
      } else {
        Object.entries(managedChildren).forEach(([i, info]) => {
          let shouldBeSet = i == activatedIndex;

          if (getChildFlag(i) != shouldBeSet) {
            setChildFlag(i, shouldBeSet);
          }
        });
      }
    });
  }

  /**
   * Returns a function that will, when called, force the component
   * that uses this hook to re-render itself.
   *
   * It's a bit smelly, so best to use sparingly.
   */

  function useForceUpdate() {
    const [, set] = useState$1(0);
    return useRef(() => set(i => ++i)).current;
  }

  /**
   * Implements a roving tabindex system where only one "focusable"
   * component in a set is able to receive a tab focus. *Which*
   * of those elements receives focus is determined by you, but it's
   * recommended to offload that logic then to another hook, like
   * `useLinearNavigation`, which lets you change the tabbable
   * element with the arrow keys, `useTypeaheadNavigation`, which
   * lets you change the tabbable index with typeahead, or
   * `useListNavigation` if you just want everything bundled together.
   *
   * Note that the child hook returned by this function must be used
   * by every child that uses this roving tabindex logic.  The
   * prop-modifying hook *that* hook returns should then be used
   * on the child's element, as well as any other elements you'd like
   * to be explicitly made untabbable too.
   *
   * `shouldFocusOnChange` should return true if focus is
   * contained within whatever element contains the roving tab index.
   * Generally as simple as the following:
   * ```
   * const [focusedInner, setFocusedInner] = useState(false);
   * const { useHasFocusProps } = useHasFocus<ParentElement>({ setFocusedInner });
   * const focusOnChange = (focusedInner != false);
   * ```
   * It's not included here because `useRovingTabIndex` doesn't know
   * anything about the container element, only children elements.
   * And just as well! Children should be allowed at the root,
   * regardless of if it's the whole app or just a given component.
   */

  function useRovingTabIndex({
    shouldFocusOnChange: foc,
    tabbableIndex
  }) {
    const [rerenderAndFocus, setRerenderAndFocus] = useState(null);
    const getShouldFocusOnChange = useStableGetter(foc);
    useStableGetter(tabbableIndex);
    useRef(-Infinity); // Call the hook that allows us to collect information from children who provide it

    const {
      managedChildren,
      childCount,
      useManagedChild,
      indicesByElement,
      ...rest
    } = useChildManager(); // Any time the tabbable index changes,
    // notify the previous child that it's no longer tabbable,
    // and notify the next child that is allowed to be tabbed to.

    useChildFlag({
      activatedIndex: tabbableIndex,
      managedChildren,
      closestFit: true,
      setChildFlag: (index, tabbable) => {
        var _managedChildren$inde;

        if (index != null) (_managedChildren$inde = managedChildren[index]) === null || _managedChildren$inde === void 0 ? void 0 : _managedChildren$inde.setTabbable(tabbable);
      },
      getChildFlag: index => {
        var _managedChildren$inde2, _managedChildren$inde3;

        return (_managedChildren$inde2 = (_managedChildren$inde3 = managedChildren[index]) === null || _managedChildren$inde3 === void 0 ? void 0 : _managedChildren$inde3.getTabbable()) !== null && _managedChildren$inde2 !== void 0 ? _managedChildren$inde2 : null;
      }
    });
    useCallback(() => {
      if (tabbableIndex != null) managedChildren[tabbableIndex].setTabbable(true);
    }, [tabbableIndex]);
    const useRovingTabIndexChild = useCallback(info => {
      const [rrafIndex, setRrafIndex] = useState(1);
      const rerenderAndFocus = useCallback(() => {
        setRrafIndex(i => ++i);
      }, []);
      const [tabbable, setTabbable, getTabbable] = useState(null);
      let newInfo = { ...info,
        rerenderAndFocus,
        setTabbable: useCallback(tabbable => {
          setTabbable(tabbable);
        }, []),
        getTabbable
      };
      const {
        element,
        getElement,
        useManagedChildProps
      } = useManagedChild(newInfo);
      useEffect$1(() => {
        if (element && tabbable) {
          setRerenderAndFocus(_ => rerenderAndFocus);
          const shouldFocusOnChange = getShouldFocusOnChange();

          if (shouldFocusOnChange() && "focus" in element) {
            requestAnimationFrame(() => {
              queueMicrotask(() => {
                element.focus();
              });
            });
          }
        }
      }, [element, tabbable, rrafIndex]);

      function useRovingTabIndexSiblingProps({
        tabIndex,
        ...props
      }) {
        if (tabIndex == null) {
          if (tabbable) tabIndex = 0;else tabIndex = -1;
        }

        return useMergedProps()({
          tabIndex
        }, props);
      }

      function useRovingTabIndexChildProps({
        tabIndex,
        ...props
      }) {
        if (tabIndex == null) {
          if (tabbable) tabIndex = 0;else tabIndex = -1;
        }

        return useMergedProps()(useManagedChildProps({
          tabIndex
        }), props);
      }
      return {
        useRovingTabIndexChildProps,
        useRovingTabIndexSiblingProps,
        tabbable
      };
    }, [useManagedChild]);
    return {
      useRovingTabIndexChild,
      childCount,
      managedChildren,
      indicesByElement,
      focusCurrent: rerenderAndFocus,
      ...rest
    };
  }

  function identity$1(t) {
    return t;
  }

  function tryNavigateToIndex(managedCells, initial, target, searchDirection, indexMangler, indexDemangler) {
    function helper() {
      if (searchDirection === -1) {
        while (target >= 0 && (managedCells[target] == null || !!((_managedCells$target = managedCells[target]) !== null && _managedCells$target !== void 0 && _managedCells$target.hidden))) {
          var _managedCells$target;

          target = indexMangler(indexDemangler(target) - 1);
        }

        return target < 0 ? initial : target;
      } else if (searchDirection === 1) {
        while (target < managedCells.length && managedCells[target] == null || !!((_managedCells$target2 = managedCells[target]) !== null && _managedCells$target2 !== void 0 && _managedCells$target2.hidden)) {
          var _managedCells$target2;

          target = indexMangler(indexDemangler(target) + 1);
        }

        return target >= managedCells.length ? initial : target;
      } else {
        return initial;
      }
    }

    return helper();
  }

  function useGridNavigation({
    shouldFocusOnChange,
    indexMangler,
    indexDemangler
  }) {
    var _indexMangler, _indexDemangler, _getCurrentRow;

    (_indexMangler = indexMangler) !== null && _indexMangler !== void 0 ? _indexMangler : indexMangler = identity$1;
    (_indexDemangler = indexDemangler) !== null && _indexDemangler !== void 0 ? _indexDemangler : indexDemangler = identity$1;
    const getFocusCellOnRowChange = useStableCallback(shouldFocusOnChange); // Keep track of our currently tabbable row and column.
    // These are mangled, and so relative to the DOM order, not component order.
    // Any operations done on these numbers need to be demangled first,
    // otherwise they'll be incorrect.

    const [currentRow, setCurrentRow2, getCurrentRow] = useState(0);
    const [currentColumn, setCurrentColumn2, getCurrentColumn] = useState(0); // Functions used for navigating to different rows.
    // Each row has its own useRovingTabIndex -- if it's not the 
    // current row, then all of its children are non-tabbable.
    // Otherwise, it is tabbable, with the tabbable cell being currentColumn.
    // This happens automatically when these functions are called.

    const navigateToFirstRow = useCallback(() => {
      setCurrentRow2(c => tryNavigateToIndex(managedRows, c !== null && c !== void 0 ? c : 0, 0, 1, indexMangler, indexDemangler));
    }, [indexMangler, indexDemangler]);
    const navigateToLastRow = useCallback(() => {
      setCurrentRow2(c => tryNavigateToIndex(managedRows, c !== null && c !== void 0 ? c : 0, managedRows.length - 1, -1, indexMangler, indexDemangler));
    }, [indexMangler, indexDemangler]);
    const navigateToPrevRow = useCallback(() => {
      setCurrentRow2(c => {
        return tryNavigateToIndex(managedRows, c !== null && c !== void 0 ? c : 0, indexMangler(Math.max(0, indexDemangler(c !== null && c !== void 0 ? c : 0) - 1)), -1, indexMangler, indexDemangler);
      });
    }, [indexMangler, indexDemangler]);
    const navigateToNextRow = useCallback(() => {
      setCurrentRow2(c => {
        return tryNavigateToIndex(managedRows, c !== null && c !== void 0 ? c : 0, indexMangler(Math.min(managedRows.length - 1, indexDemangler(c !== null && c !== void 0 ? c : 0) + 1)), 1, indexMangler, indexDemangler);
      });
    }, [indexMangler, indexDemangler]); // Track child rows and manage keyboard navigation among them.

    const {
      childCount,
      managedChildren: managedRows,
      indicesByElement: rowIndicesByElement,
      getMountIndex: getRowMountIndex,
      mountedChildren: mountedRows,
      totalChildrenMounted: totalRowsMounted,
      totalChildrenUnounted: totalRowsUnmounted,
      useManagedChild: useManagedRow
    } = useChildManager();
    const {
      useLinearNavigationChild: useLinearNavigationChildRow
    } = useLinearNavigation({
      managedChildren: managedRows,
      index: indexMangler((_getCurrentRow = getCurrentRow()) !== null && _getCurrentRow !== void 0 ? _getCurrentRow : 0),
      navigateToFirst: navigateToFirstRow,
      navigateToLast: navigateToLastRow,
      navigateToNext: navigateToNextRow,
      navigateToPrev: navigateToPrevRow,
      navigationDirection: "block"
    }); // Actually handle notifying the relevant rows when they
    // change from untabbable to tabbable or vice-versa.

    useChildFlag({
      activatedIndex: currentRow,
      managedChildren: managedRows,
      setChildFlag: (index, tabbable) => {
        var _managedRows$index;

        (_managedRows$index = managedRows[index]) === null || _managedRows$index === void 0 ? void 0 : _managedRows$index.setIsTabbableRow(tabbable);
      },
      getChildFlag: index => {
        var _managedRows$index$ge, _managedRows$index2;

        return (_managedRows$index$ge = (_managedRows$index2 = managedRows[index]) === null || _managedRows$index2 === void 0 ? void 0 : _managedRows$index2.getIsTabbableRow()) !== null && _managedRows$index$ge !== void 0 ? _managedRows$index$ge : null;
      },
      useEffect: useEffect
    });
    /**
     * Optional, but provides typeahead for each column in the table.
     */

    const useGridNavigationColumn = useCallback(({}) => {
      const {
        currentTypeahead,
        invalidTypeahead,
        useTypeaheadNavigationChild
      } = useTypeaheadNavigation({
        getIndex: getCurrentRow,
        setIndex: setCurrentRow2
      });
      const useGridNavigationColumnChild = useCallback(({
        index: rowIndex,
        text,
        hidden
      }) => {
        useTypeaheadNavigationChild({
          index: rowIndex,
          text: hidden ? null : text
        });
      }, [useTypeaheadNavigationChild]);
      return {
        useGridNavigationColumnChild,
        currentTypeahead,
        invalidTypeahead
      };
    }, []); // Last thing before we return -- here's the hook for individual rows and their cells.

    const useGridNavigationRow = useCallback(({
      index: rowIndex,
      hidden,
      ...info
    }) => {
      // When we change the current column, we send that information
      // to the parent via setState, but that doesn't do anything
      // for us.  The parent doesn't ever manage rows' cells for them.
      // 
      // So to get us to also update alongside the parent,
      // we just use forceUpdate.
      // We could also keep a copy of, like, "what this row thinks
      // the current column is" that *should* always be kept in-
      // sync with "getCurrentColumn()" as a state variable,
      // but it *just* being used for that is arguably *more* confusing.
      //
      // Basically, information regarding the currently selected column
      // "belongs" to *both* this row and the parent, conceptually,
      // but for cleanliness' sake, just one of them gets it,
      // and the other is manually updated whenever it changes.
      const forceUpdate = useForceUpdate(); // "Shortcut" for any given row to know that it should or should not
      // consider one of its cells tabbable.  Also used to determine
      // if a change to the current selected cell should also
      // trigger focusing that cell.

      const [isTabbableRow, setIsTabbableRow, getIsTabbableRow] = useState(null); // If we're not the tabbable row, then for the purposes of tabIndex
      // calculations, we don't have a tabbable child cell.

      let currentColumn = isTabbableRow ? getCurrentColumn() : null; // Track child cells and manage keyboard navigation among them.

      const {
        managedChildren: managedCells,
        useRovingTabIndexChild: useRovingTabIndexCell,
        childCount: cellCount
      } = useRovingTabIndex({
        shouldFocusOnChange: useCallback(() => {
          return !!getFocusCellOnRowChange() && !!getIsTabbableRow();
        }, []),
        tabbableIndex: currentColumn
      }); // More navigation stuff

      const navigateToFirstColumn = useCallback(() => {
        setCurrentColumn2(tryNavigateToIndex(managedCells, 0, 0, 1, identity$1, identity$1));
        forceUpdate();
      }, []);
      const navigateToLastColumn = useCallback(() => {
        setCurrentColumn2(tryNavigateToIndex(managedCells, managedCells.length, managedCells.length, -1, identity$1, identity$1));
        forceUpdate();
      }, []);
      const navigateToPrevColumn = useCallback(() => {
        setCurrentColumn2(c => {
          return tryNavigateToIndex(managedCells, c, c - 1, -1, identity$1, identity$1);
        });
        forceUpdate();
      }, []);
      const navigateToNextColumn = useCallback(() => {
        setCurrentColumn2(c => {
          return tryNavigateToIndex(managedCells, c, c + 1, 1, identity$1, identity$1);
        });
        forceUpdate();
      }, []);
      const {
        useLinearNavigationChild: useLinearNavigationChildCell
      } = useLinearNavigation({
        managedChildren: managedCells,
        navigationDirection: "inline",
        index: currentColumn !== null && currentColumn !== void 0 ? currentColumn : 0,
        disableHomeEndKeys: true,
        navigateToFirst: navigateToFirstColumn,
        navigateToLast: navigateToLastColumn,
        navigateToPrev: navigateToPrevColumn,
        navigateToNext: navigateToNextColumn
      }); // Notify the relevant child cells when they should/should not be tabbable

      useChildFlag({
        activatedIndex: currentColumn,
        managedChildren: managedCells,
        setChildFlag: (cellIndex, cellIsTabbable) => {
          var _managedCells$cellInd;

          if (cellIndex != null) (_managedCells$cellInd = managedCells[cellIndex]) === null || _managedCells$cellInd === void 0 ? void 0 : _managedCells$cellInd.setTabbable(cellIsTabbable);
        },
        getChildFlag: cellIndex => {
          var _managedCells$cellInd2, _managedCells$cellInd3;

          return (_managedCells$cellInd2 = (_managedCells$cellInd3 = managedCells[cellIndex]) === null || _managedCells$cellInd3 === void 0 ? void 0 : _managedCells$cellInd3.getTabbable()) !== null && _managedCells$cellInd2 !== void 0 ? _managedCells$cellInd2 : null;
        },
        useEffect
      }); // Any time we become the currently tabbable row,
      // make sure that we're in a valid cell, and shift left/right if not to find one.
      // TODO: Seems kinda janky? Is there no cleaner way to accomplish this,
      // especially since it's similar to other code?

      useEffect(() => {
        if (isTabbableRow) {
          let cellIndex = getCurrentColumn();

          while (cellIndex >= 0 && managedCells[cellIndex] == null) {
            --cellIndex;
          }

          if (cellIndex < 0) {
            cellIndex = getCurrentColumn();

            while (cellIndex < managedCells.length && managedCells[cellIndex] == null) {
              ++cellIndex;
            }

            if (cellIndex == managedCells.length) cellIndex = getCurrentColumn();
          }

          if (cellIndex != getCurrentColumn()) setCurrentColumn2(cellIndex);
        }
      }, [isTabbableRow]);
      const {
        useManagedChildProps: useManagedRowProps
      } = useManagedRow({
        index: rowIndex,
        setIsTabbableRow,
        getIsTabbableRow: getIsTabbableRow,
        hidden,
        ...info
      });
      const {
        useLinearNavigationChildProps: useLinearNavigationChildRowProps
      } = useLinearNavigationChildRow(info);
      const useGridNavigationRowProps = useCallback(props => useManagedRowProps(useLinearNavigationChildRowProps(useMergedProps()({
        hidden: !!hidden,
        "data-index": rowIndex
      }, props))), [useManagedRowProps, !!hidden]);
      const getRowIndex = useStableGetter(rowIndex);
      const useGridNavigationCell = useCallback(info => {
        const [tabbable, setTabbable] = useState(false);
        const {
          useRovingTabIndexChildProps
        } = useRovingTabIndexCell({ ...info,
          setTabbable
        });
        const {
          useLinearNavigationChildProps: useLinearNavigationChildCellProps
        } = useLinearNavigationChildCell(info); // Any time we interact with this cell, set it to be
        // our "currently tabbable" cell, regardless of
        // any previously selected row/column.
        //
        // TODO: Mouseup/down might be preferable,
        // but it doesn't fire on label elements here?????

        const onClick = useCallback(() => {
          setCurrentRow2(getRowIndex());
          setCurrentColumn2(info.index);
        }, [info.index]);
        const useGridNavigationCellProps = useCallback(props => useRovingTabIndexChildProps(useLinearNavigationChildCellProps(useMergedProps()({
          onClick
        }, props))), [useLinearNavigationChildCellProps]);
        return {
          tabbable,
          useGridNavigationCellProps
        };
      }, [useLinearNavigationChildCell]);
      return {
        currentColumn,
        useGridNavigationRowProps,
        useGridNavigationCell,
        cellCount,
        isTabbableRow,
        managedCells: managedCells
      };
    }, [useLinearNavigationChildRow, useManagedRow, indexDemangler, indexMangler]);
    return {
      useGridNavigationRow,
      useGridNavigationColumn,
      rowCount: childCount,
      cellIndex: currentColumn,
      rowIndex: currentRow,
      managedRows
    };
  }

  /**
   * Allows attaching an event handler to any *non-Preact* element, and removing it when the component using the hook unmounts. The callback does not need to be stable across renders.
   *
   * Due to typing limitations, this function must be called like this:
   *
   * `useEventHandler(element, "input")<InputEvent>(e => {})`
   *
   * The type argument is optional, but narrows down the type from "a union of all events" to whatever you specify, and errors if it doesn't exist.
   *
   * There is a separate version that attaches event handlers to a set of props.
   * It takes different event string types (onEvent vs onevent).
   *
   * @param target A *non-Preact* node to attach the event to.
   * @returns
   * *
   */

  function useGlobalHandler(target, type, handler, options) {
    // Note to self: The typing doesn't improve even if this is split up into a sub-function.
    // No matter what, it seems impossible to get the handler's event object typed perfectly.
    // It seems like it's guaranteed to always be a union of all available tupes.
    // Again, no matter what combination of sub- or sub-sub-functions used.
    let stableHandler = useStableCallback(handler !== null && handler !== void 0 ? handler : () => {});
    if (handler == null) stableHandler = null;
    useEffect$1(() => {
      if (stableHandler) {
        target.addEventListener(type, stableHandler, options);
        return () => target.removeEventListener(type, stableHandler, options);
      }
    }, [target, type, stableHandler]);
  }

  const activeElementUpdaters = new Set();
  const lastActiveElementUpdaters = new Set();
  const windowFocusedUpdaters = new Set();
  let windowFocused = true;

  function focusout(e) {
    if (e.relatedTarget == null) {
      for (let f of activeElementUpdaters) f === null || f === void 0 ? void 0 : f(null);
    }
  }

  function focusin(e) {
    let currentlyFocusedElement = e.target;
    let lastFocusedElement = e.target;
    activeElementUpdaters.forEach(f => f === null || f === void 0 ? void 0 : f(currentlyFocusedElement));
    lastActiveElementUpdaters.forEach(f => f === null || f === void 0 ? void 0 : f(lastFocusedElement));
  }

  function windowFocus() {
    windowFocused = true;
    windowFocusedUpdaters.forEach(f => f === null || f === void 0 ? void 0 : f(windowFocused));
  }

  function windowBlur() {
    windowFocused = false;
    windowFocusedUpdaters.forEach(f => f === null || f === void 0 ? void 0 : f(windowFocused));
  }
  /**
   * Allows you to inspect which element in the `document` currently has focus, which was most recently focused if none are currently, and whether or not the window has focus by returning the following functions:
   * * `getActiveElement()`
   * * `getLastActiveElement()`
   * * `getWindowFocused()`
   * * **No prop-modifying hook is returned because none is necessary**
   *
   * (The document's body receiving focus, like it does when you click on an empty area, is counted as no element having focus for all intents and purposes)
   *
   * This is a passive hook, so by default it returns getter functions that report this information but the component will not re-render by default when the active element changes.
   *
   * If you need the component to re-render when the active element changes, use the `on*Change` arguments to set some state on your end.
   */


  function useActiveElement({
    onActiveElementChange,
    onLastActiveElementChange,
    onWindowFocusedChange
  }) {
    const [getActiveElement, setActiveElement] = usePassiveState(onActiveElementChange, undefined);
    const [getLastActiveElement, setLastActiveElement] = usePassiveState(onLastActiveElementChange, undefined);
    const [getWindowFocused, setWindowFocused] = usePassiveState(onWindowFocusedChange, () => windowFocused);
    useLayoutEffect$1(() => {
      if (activeElementUpdaters.size === 0) {
        document.addEventListener("focusin", focusin, {
          passive: true
        });
        document.addEventListener("focusout", focusout, {
          passive: true
        });
        window.addEventListener("focus", windowFocus, {
          passive: true
        });
        window.addEventListener("blur", windowBlur, {
          passive: true
        });
      } // Add them even if they're undefined to more easily
      // manage the ">0 means don't add handlers" logic.


      activeElementUpdaters.add(setActiveElement);
      lastActiveElementUpdaters.add(setLastActiveElement);
      windowFocusedUpdaters.add(setWindowFocused);
      return () => {
        activeElementUpdaters.delete(setActiveElement);
        lastActiveElementUpdaters.delete(setLastActiveElement);
        windowFocusedUpdaters.delete(setWindowFocused);

        if (activeElementUpdaters.size === 0) {
          document.removeEventListener("focusin", focusin);
          document.removeEventListener("focusout", focusout);
          window.removeEventListener("focus", windowFocus);
          window.removeEventListener("blur", windowBlur);
        }
      };
    }, []);
    return {
      getActiveElement,
      getLastActiveElement,
      getWindowFocused
    };
  }

  function useHasFocus({
    onFocusedChanged,
    onFocusedInnerChanged,
    onLastFocusedChanged,
    onLastFocusedInnerChanged,
    onLastActiveElementChange,
    onActiveElementChange,
    onWindowFocusedChange
  }) {
    const {
      getElement,
      useRefElementProps
    } = useRefElement({});
    const [getFocused, setFocused] = usePassiveState(onFocusedChanged, () => false);
    const [getFocusedInner, setFocusedInner] = usePassiveState(onFocusedInnerChanged, () => false);
    const [getLastFocused, setLastFocused] = usePassiveState(onLastFocusedChanged, () => false);
    const [getLastFocusedInner, setLastFocusedInner] = usePassiveState(onLastFocusedInnerChanged, () => false);
    const {
      getActiveElement,
      getLastActiveElement,
      getWindowFocused
    } = useActiveElement({
      onActiveElementChange: (activeElement, prevActiveElement) => {
        const selfElement = getElement();
        const focused = selfElement != null && selfElement == activeElement;
        const focusedInner = !!(selfElement !== null && selfElement !== void 0 && selfElement.contains(activeElement));
        setFocused(focused);
        setFocusedInner(focusedInner);
        onActiveElementChange === null || onActiveElementChange === void 0 ? void 0 : onActiveElementChange(activeElement, prevActiveElement);
      },
      onLastActiveElementChange: (lastActiveElement, prevLastActiveElement) => {
        const selfElement = getElement();
        const focused = selfElement != null && selfElement == lastActiveElement;
        const focusedInner = !!(selfElement !== null && selfElement !== void 0 && selfElement.contains(lastActiveElement));
        setLastFocused(focused);
        setLastFocusedInner(focusedInner);
        onLastActiveElementChange === null || onLastActiveElementChange === void 0 ? void 0 : onLastActiveElementChange(lastActiveElement, prevLastActiveElement);
      },
      onWindowFocusedChange
    });
    const useHasFocusProps = useCallback(props => {
      return useRefElementProps(props);
    }, [useRefElementProps]);
    return {
      useHasFocusProps,
      getElement,
      getFocused,
      getFocusedInner,
      getLastFocused,
      getLastFocusedInner,
      getActiveElement,
      getLastActiveElement,
      getWindowFocused
    };
  }

  function getFromLocalStorage() {
    return function (key, converter = JSON.parse) {
      try {
        const item = localStorage.getItem(key);
        if (!item) return undefined;
        return converter(item);
      } catch (e) {
        debugger; // Intentional

        return undefined;
      }
    };
  }
  function storeToLocalStorage() {
    return function (key, value, converter = JSON.stringify) {
      try {
        localStorage.setItem(key, converter(value));
      } catch (e) {
        debugger; // Intentional
      }
    };
  }

  function identity(t) {
    return t;
  }
  /**
   * Implements proper keyboard navigation for components like listboxes, button groups, menus, etc.
   *
   * In the document order, there will be only one "focused" or "tabbable" element, making it act more like one complete unit in comparison to everything around it.
   * Navigating forwards/backwards can be done with the arrow keys, Home/End keys, or any any text for typeahead to focus the next item that matches.
   */


  function useListNavigation({
    initialIndex,
    shouldFocusOnChange,
    collator,
    keyNavigation,
    indexMangler,
    indexDemangler
  }) {
    var _indexMangler, _indexDemangler, _keyNavigation, _getTabbableIndex;

    (_indexMangler = indexMangler) !== null && _indexMangler !== void 0 ? _indexMangler : indexMangler = identity;
    (_indexDemangler = indexDemangler) !== null && _indexDemangler !== void 0 ? _indexDemangler : indexDemangler = identity;
    (_keyNavigation = keyNavigation) !== null && _keyNavigation !== void 0 ? _keyNavigation : keyNavigation = "either"; // Keep track of three things related to the currently tabbable element's index:
    // What it is, and whether, when we render this component and it's changed, to also focus the element that was made tabbable.

    const [tabbableIndex, setTabbableIndex, getTabbableIndex] = useState(initialIndex === undefined ? 0 : initialIndex);
    const {
      managedChildren,
      indicesByElement,
      useRovingTabIndexChild,
      focusCurrent,
      ...rest
    } = useRovingTabIndex({
      shouldFocusOnChange,
      tabbableIndex
    });
    const navigateToIndex = useCallback(i => {
      setTabbableIndex(i);
    }, []);
    const navigateToFirst = useCallback(() => {
      setTabbableIndex(indexMangler(0));
    }, []);
    const navigateToLast = useCallback(() => {
      setTabbableIndex(indexMangler(managedChildren.length - 1));
    }, []);
    const navigateToPrev = useCallback(() => {
      setTabbableIndex(i => indexMangler(indexDemangler(i !== null && i !== void 0 ? i : 0) - 1));
    }, [indexDemangler, indexMangler]);
    const navigateToNext = useCallback(() => {
      setTabbableIndex(i => indexMangler(indexDemangler(i !== null && i !== void 0 ? i : 0) + 1));
    }, [indexDemangler, indexMangler]);
    const setIndex = useCallback(index => {
      setTabbableIndex(index);
    }, []);
    const {
      currentTypeahead,
      invalidTypeahead,
      useTypeaheadNavigationChild
    } = useTypeaheadNavigation({
      collator,
      getIndex: getTabbableIndex,
      setIndex,
      typeaheadTimeout: 1000
    });
    const {
      useLinearNavigationChild
    } = useLinearNavigation({
      navigationDirection: keyNavigation,
      index: (_getTabbableIndex = getTabbableIndex()) !== null && _getTabbableIndex !== void 0 ? _getTabbableIndex : 0,
      managedChildren,
      navigateToPrev,
      navigateToNext,
      navigateToFirst,
      navigateToLast
    });
    const useListNavigationChild = useCallback(info => {
      const {
        useTypeaheadNavigationChildProps
      } = useTypeaheadNavigationChild(info);
      const {
        useLinearNavigationChildProps
      } = useLinearNavigationChild(info);
      const {
        useRovingTabIndexChildProps,
        useRovingTabIndexSiblingProps,
        tabbable
      } = useRovingTabIndexChild(info);

      const useListNavigationChildProps = function ({ ...props
      }) {
        return useMergedProps()(useRovingTabIndexChildProps(useTypeaheadNavigationChildProps(useLinearNavigationChildProps({
          onClick: roveToSelf
        }))), props);
      };

      const roveToSelf = useCallback(() => {
        navigateToIndex(info.index);
      }, []);
      return {
        useListNavigationChildProps,
        useListNavigationSiblingProps: useRovingTabIndexSiblingProps,
        tabbable
      };
    }, [useTypeaheadNavigationChild, useLinearNavigationChild, useRovingTabIndexChild, navigateToIndex]);
    return {
      useListNavigationChild,
      currentTypeahead,
      invalidTypeahead,
      tabbableIndex,
      setTabbableIndex,
      managedChildren,
      indicesByElement,
      navigateToIndex,
      navigateToNext,
      navigateToPrev,
      navigateToFirst,
      navigateToLast,
      focusCurrent,
      ...rest
    };
  }

  /*!
  * tabbable 5.2.1
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  */
  var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
  var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

  var isInput = function isInput(node) {
    return node.tagName === 'INPUT';
  };

  var isHiddenInput = function isHiddenInput(node) {
    return isInput(node) && node.type === 'hidden';
  };

  var isDetailsWithSummary = function isDetailsWithSummary(node) {
    var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
      return child.tagName === 'SUMMARY';
    });
    return r;
  };

  var isHidden = function isHidden(node, displayCheck) {
    if (getComputedStyle(node).visibility === 'hidden') {
      return true;
    }

    var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
    var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

    if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
      return true;
    }

    if (!displayCheck || displayCheck === 'full') {
      while (node) {
        if (getComputedStyle(node).display === 'none') {
          return true;
        }

        node = node.parentElement;
      }
    } else if (displayCheck === 'non-zero-area') {
      var _node$getBoundingClie = node.getBoundingClientRect(),
          width = _node$getBoundingClie.width,
          height = _node$getBoundingClie.height;

      return width === 0 && height === 0;
    }

    return false;
  }; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
  //  unless they are in the _first_ <legend> element of the top-most disabled
  //  fieldset


  var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
    if (isInput(node) || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA' || node.tagName === 'BUTTON') {
      var parentNode = node.parentElement;

      while (parentNode) {
        if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
          // look for the first <legend> as an immediate child of the disabled
          //  <fieldset>: if the node is in that legend, it'll be enabled even
          //  though the fieldset is disabled; otherwise, the node is in a
          //  secondary/subsequent legend, or somewhere else within the fieldset
          //  (however deep nested) and it'll be disabled
          for (var i = 0; i < parentNode.children.length; i++) {
            var child = parentNode.children.item(i);

            if (child.tagName === 'LEGEND') {
              if (child.contains(node)) {
                return false;
              } // the node isn't in the first legend (in doc order), so no matter
              //  where it is now, it'll be disabled


              return true;
            }
          } // the node isn't in a legend, so no matter where it is now, it'll be disabled


          return true;
        }

        parentNode = parentNode.parentElement;
      }
    } // else, node's tabbable/focusable state should not be affected by a fieldset's
    //  enabled/disabled state


    return false;
  };

  var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
    if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) || // For a details element with a summary, the summary element gets the focus
    isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
      return false;
    }

    return true;
  };

  var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

  var isFocusable = function isFocusable(node, options) {
    options = options || {};

    if (!node) {
      throw new Error('No node provided');
    }

    if (matches.call(node, focusableCandidateSelector) === false) {
      return false;
    }

    return isNodeMatchingSelectorFocusable(options, node);
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      factory() ;
    })(commonjsGlobal, function () {

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * This work is licensed under the W3C Software and Document License
       * (http://www.w3.org/Consortium/Legal/2015/copyright-software-and-document).
       */


      (function () {
        // Return early if we're not running inside of the browser.
        if (typeof window === 'undefined') {
          return;
        } // Convenience function for converting NodeLists.

        /** @type {typeof Array.prototype.slice} */


        var slice = Array.prototype.slice;
        /**
         * IE has a non-standard name for "matches".
         * @type {typeof Element.prototype.matches}
         */

        var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
        /** @type {string} */

        var _focusableElementsString = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'details', 'summary', 'iframe', 'object', 'embed', '[contenteditable]'].join(',');
        /**
         * `InertRoot` manages a single inert subtree, i.e. a DOM subtree whose root element has an `inert`
         * attribute.
         *
         * Its main functions are:
         *
         * - to create and maintain a set of managed `InertNode`s, including when mutations occur in the
         *   subtree. The `makeSubtreeUnfocusable()` method handles collecting `InertNode`s via registering
         *   each focusable node in the subtree with the singleton `InertManager` which manages all known
         *   focusable nodes within inert subtrees. `InertManager` ensures that a single `InertNode`
         *   instance exists for each focusable node which has at least one inert root as an ancestor.
         *
         * - to notify all managed `InertNode`s when this subtree stops being inert (i.e. when the `inert`
         *   attribute is removed from the root node). This is handled in the destructor, which calls the
         *   `deregister` method on `InertManager` for each managed inert node.
         */


        var InertRoot = function () {
          /**
           * @param {!Element} rootElement The Element at the root of the inert subtree.
           * @param {!InertManager} inertManager The global singleton InertManager object.
           */
          function InertRoot(rootElement, inertManager) {
            _classCallCheck(this, InertRoot);
            /** @type {!InertManager} */


            this._inertManager = inertManager;
            /** @type {!Element} */

            this._rootElement = rootElement;
            /**
             * @type {!Set<!InertNode>}
             * All managed focusable nodes in this InertRoot's subtree.
             */

            this._managedNodes = new Set(); // Make the subtree hidden from assistive technology

            if (this._rootElement.hasAttribute('aria-hidden')) {
              /** @type {?string} */
              this._savedAriaHidden = this._rootElement.getAttribute('aria-hidden');
            } else {
              this._savedAriaHidden = null;
            }

            this._rootElement.setAttribute('aria-hidden', 'true'); // Make all focusable elements in the subtree unfocusable and add them to _managedNodes


            this._makeSubtreeUnfocusable(this._rootElement); // Watch for:
            // - any additions in the subtree: make them unfocusable too
            // - any removals from the subtree: remove them from this inert root's managed nodes
            // - attribute changes: if `tabindex` is added, or removed from an intrinsically focusable
            //   element, make that node a managed node.


            this._observer = new MutationObserver(this._onMutation.bind(this));

            this._observer.observe(this._rootElement, {
              attributes: true,
              childList: true,
              subtree: true
            });
          }
          /**
           * Call this whenever this object is about to become obsolete.  This unwinds all of the state
           * stored in this object and updates the state of all of the managed nodes.
           */


          _createClass(InertRoot, [{
            key: 'destructor',
            value: function destructor() {
              this._observer.disconnect();

              if (this._rootElement) {
                if (this._savedAriaHidden !== null) {
                  this._rootElement.setAttribute('aria-hidden', this._savedAriaHidden);
                } else {
                  this._rootElement.removeAttribute('aria-hidden');
                }
              }

              this._managedNodes.forEach(function (inertNode) {
                this._unmanageNode(inertNode.node);
              }, this); // Note we cast the nulls to the ANY type here because:
              // 1) We want the class properties to be declared as non-null, or else we
              //    need even more casts throughout this code. All bets are off if an
              //    instance has been destroyed and a method is called.
              // 2) We don't want to cast "this", because we want type-aware optimizations
              //    to know which properties we're setting.


              this._observer =
              /** @type {?} */
              null;
              this._rootElement =
              /** @type {?} */
              null;
              this._managedNodes =
              /** @type {?} */
              null;
              this._inertManager =
              /** @type {?} */
              null;
            }
            /**
             * @return {!Set<!InertNode>} A copy of this InertRoot's managed nodes set.
             */

          }, {
            key: '_makeSubtreeUnfocusable',

            /**
             * @param {!Node} startNode
             */
            value: function _makeSubtreeUnfocusable(startNode) {
              var _this2 = this;

              composedTreeWalk(startNode, function (node) {
                return _this2._visitNode(node);
              });
              var activeElement = document.activeElement;

              if (!document.body.contains(startNode)) {
                // startNode may be in shadow DOM, so find its nearest shadowRoot to get the activeElement.
                var node = startNode;
                /** @type {!ShadowRoot|undefined} */

                var root = undefined;

                while (node) {
                  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    root =
                    /** @type {!ShadowRoot} */
                    node;
                    break;
                  }

                  node = node.parentNode;
                }

                if (root) {
                  activeElement = root.activeElement;
                }
              }

              if (startNode.contains(activeElement)) {
                activeElement.blur(); // In IE11, if an element is already focused, and then set to tabindex=-1
                // calling blur() will not actually move the focus.
                // To work around this we call focus() on the body instead.

                if (activeElement === document.activeElement) {
                  document.body.focus();
                }
              }
            }
            /**
             * @param {!Node} node
             */

          }, {
            key: '_visitNode',
            value: function _visitNode(node) {
              if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
              }

              var element =
              /** @type {!Element} */
              node; // If a descendant inert root becomes un-inert, its descendants will still be inert because of
              // this inert root, so all of its managed nodes need to be adopted by this InertRoot.

              if (element !== this._rootElement && element.hasAttribute('inert')) {
                this._adoptInertRoot(element);
              }

              if (matches.call(element, _focusableElementsString) || element.hasAttribute('tabindex')) {
                this._manageNode(element);
              }
            }
            /**
             * Register the given node with this InertRoot and with InertManager.
             * @param {!Node} node
             */

          }, {
            key: '_manageNode',
            value: function _manageNode(node) {
              var inertNode = this._inertManager.register(node, this);

              this._managedNodes.add(inertNode);
            }
            /**
             * Unregister the given node with this InertRoot and with InertManager.
             * @param {!Node} node
             */

          }, {
            key: '_unmanageNode',
            value: function _unmanageNode(node) {
              var inertNode = this._inertManager.deregister(node, this);

              if (inertNode) {
                this._managedNodes['delete'](inertNode);
              }
            }
            /**
             * Unregister the entire subtree starting at `startNode`.
             * @param {!Node} startNode
             */

          }, {
            key: '_unmanageSubtree',
            value: function _unmanageSubtree(startNode) {
              var _this3 = this;

              composedTreeWalk(startNode, function (node) {
                return _this3._unmanageNode(node);
              });
            }
            /**
             * If a descendant node is found with an `inert` attribute, adopt its managed nodes.
             * @param {!Element} node
             */

          }, {
            key: '_adoptInertRoot',
            value: function _adoptInertRoot(node) {
              var inertSubroot = this._inertManager.getInertRoot(node); // During initialisation this inert root may not have been registered yet,
              // so register it now if need be.


              if (!inertSubroot) {
                this._inertManager.setInert(node, true);

                inertSubroot = this._inertManager.getInertRoot(node);
              }

              inertSubroot.managedNodes.forEach(function (savedInertNode) {
                this._manageNode(savedInertNode.node);
              }, this);
            }
            /**
             * Callback used when mutation observer detects subtree additions, removals, or attribute changes.
             * @param {!Array<!MutationRecord>} records
             * @param {!MutationObserver} self
             */

          }, {
            key: '_onMutation',
            value: function _onMutation(records, self) {
              records.forEach(function (record) {
                var target =
                /** @type {!Element} */
                record.target;

                if (record.type === 'childList') {
                  // Manage added nodes
                  slice.call(record.addedNodes).forEach(function (node) {
                    this._makeSubtreeUnfocusable(node);
                  }, this); // Un-manage removed nodes

                  slice.call(record.removedNodes).forEach(function (node) {
                    this._unmanageSubtree(node);
                  }, this);
                } else if (record.type === 'attributes') {
                  if (record.attributeName === 'tabindex') {
                    // Re-initialise inert node if tabindex changes
                    this._manageNode(target);
                  } else if (target !== this._rootElement && record.attributeName === 'inert' && target.hasAttribute('inert')) {
                    // If a new inert root is added, adopt its managed nodes and make sure it knows about the
                    // already managed nodes from this inert subroot.
                    this._adoptInertRoot(target);

                    var inertSubroot = this._inertManager.getInertRoot(target);

                    this._managedNodes.forEach(function (managedNode) {
                      if (target.contains(managedNode.node)) {
                        inertSubroot._manageNode(managedNode.node);
                      }
                    });
                  }
                }
              }, this);
            }
          }, {
            key: 'managedNodes',
            get: function get() {
              return new Set(this._managedNodes);
            }
            /** @return {boolean} */

          }, {
            key: 'hasSavedAriaHidden',
            get: function get() {
              return this._savedAriaHidden !== null;
            }
            /** @param {?string} ariaHidden */

          }, {
            key: 'savedAriaHidden',
            set: function set(ariaHidden) {
              this._savedAriaHidden = ariaHidden;
            }
            /** @return {?string} */
            ,
            get: function get() {
              return this._savedAriaHidden;
            }
          }]);

          return InertRoot;
        }();
        /**
         * `InertNode` initialises and manages a single inert node.
         * A node is inert if it is a descendant of one or more inert root elements.
         *
         * On construction, `InertNode` saves the existing `tabindex` value for the node, if any, and
         * either removes the `tabindex` attribute or sets it to `-1`, depending on whether the element
         * is intrinsically focusable or not.
         *
         * `InertNode` maintains a set of `InertRoot`s which are descendants of this `InertNode`. When an
         * `InertRoot` is destroyed, and calls `InertManager.deregister()`, the `InertManager` notifies the
         * `InertNode` via `removeInertRoot()`, which in turn destroys the `InertNode` if no `InertRoot`s
         * remain in the set. On destruction, `InertNode` reinstates the stored `tabindex` if one exists,
         * or removes the `tabindex` attribute if the element is intrinsically focusable.
         */


        var InertNode = function () {
          /**
           * @param {!Node} node A focusable element to be made inert.
           * @param {!InertRoot} inertRoot The inert root element associated with this inert node.
           */
          function InertNode(node, inertRoot) {
            _classCallCheck(this, InertNode);
            /** @type {!Node} */


            this._node = node;
            /** @type {boolean} */

            this._overrodeFocusMethod = false;
            /**
             * @type {!Set<!InertRoot>} The set of descendant inert roots.
             *    If and only if this set becomes empty, this node is no longer inert.
             */

            this._inertRoots = new Set([inertRoot]);
            /** @type {?number} */

            this._savedTabIndex = null;
            /** @type {boolean} */

            this._destroyed = false; // Save any prior tabindex info and make this node untabbable

            this.ensureUntabbable();
          }
          /**
           * Call this whenever this object is about to become obsolete.
           * This makes the managed node focusable again and deletes all of the previously stored state.
           */


          _createClass(InertNode, [{
            key: 'destructor',
            value: function destructor() {
              this._throwIfDestroyed();

              if (this._node && this._node.nodeType === Node.ELEMENT_NODE) {
                var element =
                /** @type {!Element} */
                this._node;

                if (this._savedTabIndex !== null) {
                  element.setAttribute('tabindex', this._savedTabIndex);
                } else {
                  element.removeAttribute('tabindex');
                } // Use `delete` to restore native focus method.


                if (this._overrodeFocusMethod) {
                  delete element.focus;
                }
              } // See note in InertRoot.destructor for why we cast these nulls to ANY.


              this._node =
              /** @type {?} */
              null;
              this._inertRoots =
              /** @type {?} */
              null;
              this._destroyed = true;
            }
            /**
             * @type {boolean} Whether this object is obsolete because the managed node is no longer inert.
             * If the object has been destroyed, any attempt to access it will cause an exception.
             */

          }, {
            key: '_throwIfDestroyed',

            /**
             * Throw if user tries to access destroyed InertNode.
             */
            value: function _throwIfDestroyed() {
              if (this.destroyed) {
                throw new Error('Trying to access destroyed InertNode');
              }
            }
            /** @return {boolean} */

          }, {
            key: 'ensureUntabbable',

            /** Save the existing tabindex value and make the node untabbable and unfocusable */
            value: function ensureUntabbable() {
              if (this.node.nodeType !== Node.ELEMENT_NODE) {
                return;
              }

              var element =
              /** @type {!Element} */
              this.node;

              if (matches.call(element, _focusableElementsString)) {
                if (
                /** @type {!HTMLElement} */
                element.tabIndex === -1 && this.hasSavedTabIndex) {
                  return;
                }

                if (element.hasAttribute('tabindex')) {
                  this._savedTabIndex =
                  /** @type {!HTMLElement} */
                  element.tabIndex;
                }

                element.setAttribute('tabindex', '-1');

                if (element.nodeType === Node.ELEMENT_NODE) {
                  element.focus = function () {};

                  this._overrodeFocusMethod = true;
                }
              } else if (element.hasAttribute('tabindex')) {
                this._savedTabIndex =
                /** @type {!HTMLElement} */
                element.tabIndex;
                element.removeAttribute('tabindex');
              }
            }
            /**
             * Add another inert root to this inert node's set of managing inert roots.
             * @param {!InertRoot} inertRoot
             */

          }, {
            key: 'addInertRoot',
            value: function addInertRoot(inertRoot) {
              this._throwIfDestroyed();

              this._inertRoots.add(inertRoot);
            }
            /**
             * Remove the given inert root from this inert node's set of managing inert roots.
             * If the set of managing inert roots becomes empty, this node is no longer inert,
             * so the object should be destroyed.
             * @param {!InertRoot} inertRoot
             */

          }, {
            key: 'removeInertRoot',
            value: function removeInertRoot(inertRoot) {
              this._throwIfDestroyed();

              this._inertRoots['delete'](inertRoot);

              if (this._inertRoots.size === 0) {
                this.destructor();
              }
            }
          }, {
            key: 'destroyed',
            get: function get() {
              return (
                /** @type {!InertNode} */
                this._destroyed
              );
            }
          }, {
            key: 'hasSavedTabIndex',
            get: function get() {
              return this._savedTabIndex !== null;
            }
            /** @return {!Node} */

          }, {
            key: 'node',
            get: function get() {
              this._throwIfDestroyed();

              return this._node;
            }
            /** @param {?number} tabIndex */

          }, {
            key: 'savedTabIndex',
            set: function set(tabIndex) {
              this._throwIfDestroyed();

              this._savedTabIndex = tabIndex;
            }
            /** @return {?number} */
            ,
            get: function get() {
              this._throwIfDestroyed();

              return this._savedTabIndex;
            }
          }]);

          return InertNode;
        }();
        /**
         * InertManager is a per-document singleton object which manages all inert roots and nodes.
         *
         * When an element becomes an inert root by having an `inert` attribute set and/or its `inert`
         * property set to `true`, the `setInert` method creates an `InertRoot` object for the element.
         * The `InertRoot` in turn registers itself as managing all of the element's focusable descendant
         * nodes via the `register()` method. The `InertManager` ensures that a single `InertNode` instance
         * is created for each such node, via the `_managedNodes` map.
         */


        var InertManager = function () {
          /**
           * @param {!Document} document
           */
          function InertManager(document) {
            _classCallCheck(this, InertManager);

            if (!document) {
              throw new Error('Missing required argument; InertManager needs to wrap a document.');
            }
            /** @type {!Document} */


            this._document = document;
            /**
             * All managed nodes known to this InertManager. In a map to allow looking up by Node.
             * @type {!Map<!Node, !InertNode>}
             */

            this._managedNodes = new Map();
            /**
             * All inert roots known to this InertManager. In a map to allow looking up by Node.
             * @type {!Map<!Node, !InertRoot>}
             */

            this._inertRoots = new Map();
            /**
             * Observer for mutations on `document.body`.
             * @type {!MutationObserver}
             */

            this._observer = new MutationObserver(this._watchForInert.bind(this)); // Add inert style.

            addInertStyle(document.head || document.body || document.documentElement); // Wait for document to be loaded.

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', this._onDocumentLoaded.bind(this));
            } else {
              this._onDocumentLoaded();
            }
          }
          /**
           * Set whether the given element should be an inert root or not.
           * @param {!Element} root
           * @param {boolean} inert
           */


          _createClass(InertManager, [{
            key: 'setInert',
            value: function setInert(root, inert) {
              if (inert) {
                if (this._inertRoots.has(root)) {
                  // element is already inert
                  return;
                }

                var inertRoot = new InertRoot(root, this);
                root.setAttribute('inert', '');

                this._inertRoots.set(root, inertRoot); // If not contained in the document, it must be in a shadowRoot.
                // Ensure inert styles are added there.


                if (!this._document.body.contains(root)) {
                  var parent = root.parentNode;

                  while (parent) {
                    if (parent.nodeType === 11) {
                      addInertStyle(parent);
                    }

                    parent = parent.parentNode;
                  }
                }
              } else {
                if (!this._inertRoots.has(root)) {
                  // element is already non-inert
                  return;
                }

                var _inertRoot = this._inertRoots.get(root);

                _inertRoot.destructor();

                this._inertRoots['delete'](root);

                root.removeAttribute('inert');
              }
            }
            /**
             * Get the InertRoot object corresponding to the given inert root element, if any.
             * @param {!Node} element
             * @return {!InertRoot|undefined}
             */

          }, {
            key: 'getInertRoot',
            value: function getInertRoot(element) {
              return this._inertRoots.get(element);
            }
            /**
             * Register the given InertRoot as managing the given node.
             * In the case where the node has a previously existing inert root, this inert root will
             * be added to its set of inert roots.
             * @param {!Node} node
             * @param {!InertRoot} inertRoot
             * @return {!InertNode} inertNode
             */

          }, {
            key: 'register',
            value: function register(node, inertRoot) {
              var inertNode = this._managedNodes.get(node);

              if (inertNode !== undefined) {
                // node was already in an inert subtree
                inertNode.addInertRoot(inertRoot);
              } else {
                inertNode = new InertNode(node, inertRoot);
              }

              this._managedNodes.set(node, inertNode);

              return inertNode;
            }
            /**
             * De-register the given InertRoot as managing the given inert node.
             * Removes the inert root from the InertNode's set of managing inert roots, and remove the inert
             * node from the InertManager's set of managed nodes if it is destroyed.
             * If the node is not currently managed, this is essentially a no-op.
             * @param {!Node} node
             * @param {!InertRoot} inertRoot
             * @return {?InertNode} The potentially destroyed InertNode associated with this node, if any.
             */

          }, {
            key: 'deregister',
            value: function deregister(node, inertRoot) {
              var inertNode = this._managedNodes.get(node);

              if (!inertNode) {
                return null;
              }

              inertNode.removeInertRoot(inertRoot);

              if (inertNode.destroyed) {
                this._managedNodes['delete'](node);
              }

              return inertNode;
            }
            /**
             * Callback used when document has finished loading.
             */

          }, {
            key: '_onDocumentLoaded',
            value: function _onDocumentLoaded() {
              // Find all inert roots in document and make them actually inert.
              var inertElements = slice.call(this._document.querySelectorAll('[inert]'));
              inertElements.forEach(function (inertElement) {
                this.setInert(inertElement, true);
              }, this); // Comment this out to use programmatic API only.

              this._observer.observe(this._document.body || this._document.documentElement, {
                attributes: true,
                subtree: true,
                childList: true
              });
            }
            /**
             * Callback used when mutation observer detects attribute changes.
             * @param {!Array<!MutationRecord>} records
             * @param {!MutationObserver} self
             */

          }, {
            key: '_watchForInert',
            value: function _watchForInert(records, self) {
              var _this = this;

              records.forEach(function (record) {
                switch (record.type) {
                  case 'childList':
                    slice.call(record.addedNodes).forEach(function (node) {
                      if (node.nodeType !== Node.ELEMENT_NODE) {
                        return;
                      }

                      var inertElements = slice.call(node.querySelectorAll('[inert]'));

                      if (matches.call(node, '[inert]')) {
                        inertElements.unshift(node);
                      }

                      inertElements.forEach(function (inertElement) {
                        this.setInert(inertElement, true);
                      }, _this);
                    }, _this);
                    break;

                  case 'attributes':
                    if (record.attributeName !== 'inert') {
                      return;
                    }

                    var target =
                    /** @type {!Element} */
                    record.target;
                    var inert = target.hasAttribute('inert');

                    _this.setInert(target, inert);

                    break;
                }
              }, this);
            }
          }]);

          return InertManager;
        }();
        /**
         * Recursively walk the composed tree from |node|.
         * @param {!Node} node
         * @param {(function (!Element))=} callback Callback to be called for each element traversed,
         *     before descending into child nodes.
         * @param {?ShadowRoot=} shadowRootAncestor The nearest ShadowRoot ancestor, if any.
         */


        function composedTreeWalk(node, callback, shadowRootAncestor) {
          if (node.nodeType == Node.ELEMENT_NODE) {
            var element =
            /** @type {!Element} */
            node;

            if (callback) {
              callback(element);
            } // Descend into node:
            // If it has a ShadowRoot, ignore all child elements - these will be picked
            // up by the <content> or <shadow> elements. Descend straight into the
            // ShadowRoot.


            var shadowRoot =
            /** @type {!HTMLElement} */
            element.shadowRoot;

            if (shadowRoot) {
              composedTreeWalk(shadowRoot, callback);
              return;
            } // If it is a <content> element, descend into distributed elements - these
            // are elements from outside the shadow root which are rendered inside the
            // shadow DOM.


            if (element.localName == 'content') {
              var content =
              /** @type {!HTMLContentElement} */
              element; // Verifies if ShadowDom v0 is supported.

              var distributedNodes = content.getDistributedNodes ? content.getDistributedNodes() : [];

              for (var i = 0; i < distributedNodes.length; i++) {
                composedTreeWalk(distributedNodes[i], callback);
              }

              return;
            } // If it is a <slot> element, descend into assigned nodes - these
            // are elements from outside the shadow root which are rendered inside the
            // shadow DOM.


            if (element.localName == 'slot') {
              var slot =
              /** @type {!HTMLSlotElement} */
              element; // Verify if ShadowDom v1 is supported.

              var _distributedNodes = slot.assignedNodes ? slot.assignedNodes({
                flatten: true
              }) : [];

              for (var _i = 0; _i < _distributedNodes.length; _i++) {
                composedTreeWalk(_distributedNodes[_i], callback);
              }

              return;
            }
          } // If it is neither the parent of a ShadowRoot, a <content> element, a <slot>
          // element, nor a <shadow> element recurse normally.


          var child = node.firstChild;

          while (child != null) {
            composedTreeWalk(child, callback);
            child = child.nextSibling;
          }
        }
        /**
         * Adds a style element to the node containing the inert specific styles
         * @param {!Node} node
         */


        function addInertStyle(node) {
          if (node.querySelector('style#inert-style, link#inert-style')) {
            return;
          }

          var style = document.createElement('style');
          style.setAttribute('id', 'inert-style');
          style.textContent = '\n' + '[inert] {\n' + '  pointer-events: none;\n' + '  cursor: default;\n' + '}\n' + '\n' + '[inert], [inert] * {\n' + '  -webkit-user-select: none;\n' + '  -moz-user-select: none;\n' + '  -ms-user-select: none;\n' + '  user-select: none;\n' + '}\n';
          node.appendChild(style);
        }

        if (!Element.prototype.hasOwnProperty('inert')) {
          /** @type {!InertManager} */
          var inertManager = new InertManager(document);
          Object.defineProperty(Element.prototype, 'inert', {
            enumerable: true,

            /** @this {!Element} */
            get: function get() {
              return this.hasAttribute('inert');
            },

            /** @this {!Element} */
            set: function set(inert) {
              inertManager.setInert(this, inert);
            }
          });
        }
      })();
    });
  });

  /**
   * @license
   * Copyright 2016 Google Inc. All rights reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  (() => {
    var _a, _b, _c;
    /* Symbols for private properties */


    const _blockingElements = Symbol();

    const _alreadyInertElements = Symbol();

    const _topElParents = Symbol();

    const _siblingsToRestore = Symbol();

    const _parentMO = Symbol();
    /* Symbols for private static methods */


    const _topChanged = Symbol();

    const _swapInertedSibling = Symbol();

    const _inertSiblings = Symbol();

    const _restoreInertedSiblings = Symbol();

    const _getParents = Symbol();

    const _getDistributedChildren = Symbol();

    const _isInertable = Symbol();

    const _handleMutations = Symbol();

    class BlockingElementsImpl {
      constructor() {
        /**
         * The blocking elements.
         */
        this[_a] = [];
        /**
         * Used to keep track of the parents of the top element, from the element
         * itself up to body. When top changes, the old top might have been removed
         * from the document, so we need to memoize the inerted parents' siblings
         * in order to restore their inerteness when top changes.
         */

        this[_b] = [];
        /**
         * Elements that are already inert before the first blocking element is
         * pushed.
         */

        this[_c] = new Set();
      }

      destructor() {
        // Restore original inertness.
        this[_restoreInertedSiblings](this[_topElParents]); // Note we don't want to make these properties nullable on the class,
        // since then we'd need non-null casts in many places. Calling a method on
        // a BlockingElements instance after calling destructor will result in an
        // exception.


        const nullable = this;
        nullable[_blockingElements] = null;
        nullable[_topElParents] = null;
        nullable[_alreadyInertElements] = null;
      }

      get top() {
        const elems = this[_blockingElements];
        return elems[elems.length - 1] || null;
      }

      push(element) {
        if (!element || element === this.top) {
          return;
        } // Remove it from the stack, we'll bring it to the top.


        this.remove(element);

        this[_topChanged](element);

        this[_blockingElements].push(element);
      }

      remove(element) {
        const i = this[_blockingElements].indexOf(element);

        if (i === -1) {
          return false;
        }

        this[_blockingElements].splice(i, 1); // Top changed only if the removed element was the top element.


        if (i === this[_blockingElements].length) {
          this[_topChanged](this.top);
        }

        return true;
      }

      pop() {
        const top = this.top;
        top && this.remove(top);
        return top;
      }

      has(element) {
        return this[_blockingElements].indexOf(element) !== -1;
      }
      /**
       * Sets `inert` to all document elements except the new top element, its
       * parents, and its distributed content.
       */


      [(_a = _blockingElements, _b = _topElParents, _c = _alreadyInertElements, _topChanged)](newTop) {
        const toKeepInert = this[_alreadyInertElements];
        const oldParents = this[_topElParents]; // No new top, reset old top if any.

        if (!newTop) {
          this[_restoreInertedSiblings](oldParents);

          toKeepInert.clear();
          this[_topElParents] = [];
          return;
        }

        const newParents = this[_getParents](newTop); // New top is not contained in the main document!


        if (newParents[newParents.length - 1].parentNode !== document.body) {
          throw Error('Non-connected element cannot be a blocking element');
        } // Cast here because we know we'll call _inertSiblings on newParents
        // below.


        this[_topElParents] = newParents;

        const toSkip = this[_getDistributedChildren](newTop); // No previous top element.


        if (!oldParents.length) {
          this[_inertSiblings](newParents, toSkip, toKeepInert);

          return;
        }

        let i = oldParents.length - 1;
        let j = newParents.length - 1; // Find common parent. Index 0 is the element itself (so stop before it).

        while (i > 0 && j > 0 && oldParents[i] === newParents[j]) {
          i--;
          j--;
        } // If up the parents tree there are 2 elements that are siblings, swap
        // the inerted sibling.


        if (oldParents[i] !== newParents[j]) {
          this[_swapInertedSibling](oldParents[i], newParents[j]);
        } // Restore old parents siblings inertness.


        i > 0 && this[_restoreInertedSiblings](oldParents.slice(0, i)); // Make new parents siblings inert.

        j > 0 && this[_inertSiblings](newParents.slice(0, j), toSkip, null);
      }
      /**
       * Swaps inertness between two sibling elements.
       * Sets the property `inert` over the attribute since the inert spec
       * doesn't specify if it should be reflected.
       * https://html.spec.whatwg.org/multipage/interaction.html#inert
       */


      [_swapInertedSibling](oldInert, newInert) {
        const siblingsToRestore = oldInert[_siblingsToRestore]; // oldInert is not contained in siblings to restore, so we have to check
        // if it's inertable and if already inert.

        if (this[_isInertable](oldInert) && !oldInert.inert) {
          oldInert.inert = true;
          siblingsToRestore.add(oldInert);
        } // If newInert was already between the siblings to restore, it means it is
        // inertable and must be restored.


        if (siblingsToRestore.has(newInert)) {
          newInert.inert = false;
          siblingsToRestore.delete(newInert);
        }

        newInert[_parentMO] = oldInert[_parentMO];
        newInert[_siblingsToRestore] = siblingsToRestore;
        oldInert[_parentMO] = undefined;
        oldInert[_siblingsToRestore] = undefined;
      }
      /**
       * Restores original inertness to the siblings of the elements.
       * Sets the property `inert` over the attribute since the inert spec
       * doesn't specify if it should be reflected.
       * https://html.spec.whatwg.org/multipage/interaction.html#inert
       */


      [_restoreInertedSiblings](elements) {
        for (const element of elements) {
          const mo = element[_parentMO];
          mo.disconnect();
          element[_parentMO] = undefined;
          const siblings = element[_siblingsToRestore];

          for (const sibling of siblings) {
            sibling.inert = false;
          }

          element[_siblingsToRestore] = undefined;
        }
      }
      /**
       * Inerts the siblings of the elements except the elements to skip. Stores
       * the inerted siblings into the element's symbol `_siblingsToRestore`.
       * Pass `toKeepInert` to collect the already inert elements.
       * Sets the property `inert` over the attribute since the inert spec
       * doesn't specify if it should be reflected.
       * https://html.spec.whatwg.org/multipage/interaction.html#inert
       */


      [_inertSiblings](elements, toSkip, toKeepInert) {
        for (const element of elements) {
          // Assume element is not a Document, so it must have a parentNode.
          const parent = element.parentNode;
          const children = parent.children;
          const inertedSiblings = new Set();

          for (let j = 0; j < children.length; j++) {
            const sibling = children[j]; // Skip the input element, if not inertable or to be skipped.

            if (sibling === element || !this[_isInertable](sibling) || toSkip && toSkip.has(sibling)) {
              continue;
            } // Should be collected since already inerted.


            if (toKeepInert && sibling.inert) {
              toKeepInert.add(sibling);
            } else {
              sibling.inert = true;
              inertedSiblings.add(sibling);
            }
          } // Store the siblings that were inerted.


          element[_siblingsToRestore] = inertedSiblings; // Observe only immediate children mutations on the parent.

          const mo = new MutationObserver(this[_handleMutations].bind(this));
          element[_parentMO] = mo;
          let parentToObserve = parent; // If we're using the ShadyDOM polyfill, then our parent could be a
          // shady root, which is an object that acts like a ShadowRoot, but isn't
          // actually a node in the real DOM. Observe the real DOM parent instead.

          const maybeShadyRoot = parentToObserve;

          if (maybeShadyRoot.__shady && maybeShadyRoot.host) {
            parentToObserve = maybeShadyRoot.host;
          }

          mo.observe(parentToObserve, {
            childList: true
          });
        }
      }
      /**
       * Handles newly added/removed nodes by toggling their inertness.
       * It also checks if the current top Blocking Element has been removed,
       * notifying and removing it.
       */


      [_handleMutations](mutations) {
        const parents = this[_topElParents];
        const toKeepInert = this[_alreadyInertElements];

        for (const mutation of mutations) {
          // If the target is a shadowRoot, get its host as we skip shadowRoots when
          // computing _topElParents.
          const target = mutation.target.host || mutation.target;
          const idx = target === document.body ? parents.length : parents.indexOf(target);
          const inertedChild = parents[idx - 1];
          const inertedSiblings = inertedChild[_siblingsToRestore]; // To restore.

          for (let i = 0; i < mutation.removedNodes.length; i++) {
            const sibling = mutation.removedNodes[i];

            if (sibling === inertedChild) {
              console.info('Detected removal of the top Blocking Element.');
              this.pop();
              return;
            }

            if (inertedSiblings.has(sibling)) {
              sibling.inert = false;
              inertedSiblings.delete(sibling);
            }
          } // To inert.


          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const sibling = mutation.addedNodes[i];

            if (!this[_isInertable](sibling)) {
              continue;
            }

            if (toKeepInert && sibling.inert) {
              toKeepInert.add(sibling);
            } else {
              sibling.inert = true;
              inertedSiblings.add(sibling);
            }
          }
        }
      }
      /**
       * Returns if the element is inertable.
       */


      [_isInertable](element) {
        return false === /^(style|template|script)$/.test(element.localName);
      }
      /**
       * Returns the list of newParents of an element, starting from element
       * (included) up to `document.body` (excluded).
       */


      [_getParents](element) {
        const parents = [];
        let current = element; // Stop to body.

        while (current && current !== document.body) {
          // Skip shadow roots.
          if (current.nodeType === Node.ELEMENT_NODE) {
            parents.push(current);
          } // ShadowDom v1


          if (current.assignedSlot) {
            // Collect slots from deepest slot to top.
            while (current = current.assignedSlot) {
              parents.push(current);
            } // Continue the search on the top slot.


            current = parents.pop();
            continue;
          }

          current = current.parentNode || current.host;
        }

        return parents;
      }
      /**
       * Returns the distributed children of the element's shadow root.
       * Returns null if the element doesn't have a shadow root.
       */


      [_getDistributedChildren](element) {
        const shadowRoot = element.shadowRoot;

        if (!shadowRoot) {
          return null;
        }

        const result = new Set();
        let i;
        let j;
        let nodes;
        const slots = shadowRoot.querySelectorAll('slot');

        if (slots.length && slots[0].assignedNodes) {
          for (i = 0; i < slots.length; i++) {
            nodes = slots[i].assignedNodes({
              flatten: true
            });

            for (j = 0; j < nodes.length; j++) {
              if (nodes[j].nodeType === Node.ELEMENT_NODE) {
                result.add(nodes[j]);
              }
            }
          } // No need to search for <content>.

        }

        return result;
      }

    }

    document.$blockingElements = new BlockingElementsImpl();
  })();

  const blockingElements = document.$blockingElements;
  /**
   * Allows an element to trap focus by applying the "inert" attribute to all sibling, aunt, and uncle nodes.
   *
   * Automatically handles consecutive calls with a loosely applied stack operation
   * (specifically via `blockingElements`, with a small polyfill because I'm not sure how long
   * it'll take to find its way into the spec, if ever)
   * @param target
   */

  function useBlockingElement(target) {
    /**
     * Push/pop the element from the blockingElements stack.
     */
    useLayoutEffect$1(() => {
      if (target) {
        blockingElements.push(target);
        return () => {
          blockingElements.remove(target);
        };
      }
    }, [target]);
  }
  function getTopElement() {
    return blockingElements.top;
  }

  const elementsToRestoreFocusTo = new Map();
  function useFocusTrap({
    trapActive
  }) {
    const [element, setElement] = useState(null);
    const {
      useRefElementProps,
      getElement
    } = useRefElement({
      onElementChange: setElement
    }); //const [lastActiveElement, setLastActiveElement, getLastActiveElement] = useState<Node | null>(null);

    const {
      getActiveElement,
      getLastActiveElement,
      getWindowFocused
    } = useActiveElement({}); // When the trap becomes active, before we let the blockingElements hook run,
    // keep track of whatever's currently focused and save it.

    useLayoutEffect$1(() => {
      if (trapActive && element) {
        var _getLastActiveElement;

        // Save the currently focused element
        // to whatever's currently at the top of the stack
        elementsToRestoreFocusTo.set(getTopElement(), (_getLastActiveElement = getLastActiveElement()) !== null && _getLastActiveElement !== void 0 ? _getLastActiveElement : document.body);
      }
    }, [trapActive, element]);
    useBlockingElement(trapActive ? element : null);
    /**
     * Any time we activate or deactivate the trap,
     * change focus to something else (something in
     * the trap if it's active, or whatever we've
     * tracked in elementsToRestoreFocusTo if not)
     */

    useLayoutEffect$1(() => {
      if (trapActive && element) {
        let rafHandle = requestAnimationFrame(() => {
          // TODO: This extra queueMicrotask is needed for
          // ...reasons?
          queueMicrotask(() => {
            var _findFirstFocusable;

            (_findFirstFocusable = findFirstFocusable(element)) === null || _findFirstFocusable === void 0 ? void 0 : _findFirstFocusable.focus();
            rafHandle = 0;
          });
        });
        return () => {
          if (rafHandle) cancelAnimationFrame(rafHandle);
        };
      } else if (element) {
        // Restore the focus to the element
        // that has returned to the top of the stack
        let rafHandle = requestAnimationFrame(() => {
          queueMicrotask(() => {
            var _elementsToRestoreFoc;

            (_elementsToRestoreFoc = elementsToRestoreFocusTo.get(getTopElement())) === null || _elementsToRestoreFoc === void 0 ? void 0 : _elementsToRestoreFoc.focus();
            rafHandle = 0;
          });
        });
        return () => {
          if (rafHandle) cancelAnimationFrame(rafHandle);
        };
      }
    }, [trapActive, element]);

    const useFocusTrapProps = props => {
      return useMergedProps()({
        "aria-modal": trapActive ? "true" : undefined
      }, useRefElementProps(props));
    };

    return {
      useFocusTrapProps,
      getElement
    };
  }
  /**
   * Returns the first focusable element contained within the given node, or null if none are found.
   * @param element
   * @returns
   */

  function findFirstFocusable(element) {
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
      acceptNode: node => node instanceof Element && isFocusable(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    });
    const firstFocusable = treeWalker.firstChild();
    return firstFocusable;
  }

  function useMutationObserver(getElement, options = {}) {
    var _attributeFilter;

    let {
      attributeFilter,
      subtree,
      onChildList,
      characterDataOldValue,
      onCharacterData,
      onAttributes,
      attributeOldValue
    } = options;
    if (typeof attributeFilter === "string") attributeFilter = [attributeFilter];
    let attributeKey = (_attributeFilter = attributeFilter) === null || _attributeFilter === void 0 ? void 0 : _attributeFilter.join(";");
    const attributes = !!onAttributes;
    const characterData = !!onCharacterData;
    const childList = !!onChildList;
    const stableOnChildList = useStableCallback(onChildList !== null && onChildList !== void 0 ? onChildList : () => {});
    const stableOnCharacterData = useStableCallback(onCharacterData !== null && onCharacterData !== void 0 ? onCharacterData : () => {});
    const stableOnAttributes = useStableCallback(onAttributes !== null && onAttributes !== void 0 ? onAttributes : () => {});
    useEffect$1(() => {
      const element = getElement();

      if (element) {
        let observer = new MutationObserver(a => {
          for (let mutation of a) {
            switch (mutation.type) {
              case "childList":
                stableOnChildList(mutation);
                break;

              case "attributes":
                stableOnAttributes(mutation);
                break;

              case "characterData":
                stableOnCharacterData(mutation);
                break;
            }
          }
        });
        observer.observe(element, {
          attributeFilter: attributeFilter,
          attributeOldValue,
          attributes,
          characterData,
          characterDataOldValue,
          childList,
          subtree
        });
        return () => observer.disconnect();
      }
    }, [getElement, attributeKey, subtree, childList, characterDataOldValue, characterData, attributes, attributeOldValue]);
  }

  const EventDetail = Symbol("event-detail");
  function enhanceEvent(e, detail) {
    let event = e;
    event[EventDetail] = detail;
    return event;
  }

  let pulse = "vibrate" in navigator ? () => navigator.vibrate(10) : () => {};

  function excludes(target, exclude) {
    if (exclude !== null && exclude !== void 0 && exclude[target]) return true;
    return false;
  }
  /**
   * selection.containsNode doesn't account for selection.isCollapsed,
   * so here's a workaround for that.
   *
   * @param element
   * @returns
   */


  function nodeHasSelectedText(element) {
    if (element && element instanceof Node) {
      const selection = window.getSelection();

      if (selection !== null && selection !== void 0 && selection.containsNode(element, true) && !selection.isCollapsed) {
        return true;
      }
    }

    return false;
  }
  /**
   * Easy way to "polyfill" button-like interactions onto, e.g., a div.
   *
   * Adds click, space on keyDown, and enter on keyUp, as well as haptic
   * feedback via a momentary vibration pulse when there's an onClick handler provided
   * (this can be disabled app-wide with `setButtonVibrate`).
   *
   * In addition, when the CSS `:active` pseudo-class would apply to a normal button
   * (i.e. when holding the spacebar or during mousedown), `{ "data-pseudo-active": "true" }`
   * is added to the props.  You can either let it pass through and style it through new CSS,
   * or inspect the returned props for it and add e.g. an `.active` class for existing CSS
   *
   * @param onClick
   * @param exclude Whether the polyfill should apply (can specify for specific interactions)
   */


  function useButtonLikeEventHandlers(onClickSync, exclude) {
    const {
      useRefElementProps,
      getElement
    } = useRefElement({}); // A button can be activated in multiple ways, so on the off chance
    // that multiple are triggered at once, we only *actually* register
    // a press once all of our "on" signals have turned back to "off".
    // We approximate this by just incrementing when active, and
    // decrementing when deactivated.
    //
    // As an emergency failsafe, when the element looses focus,
    // this is reset back to 0.

    const [active, setActive, getActive] = useState(0); // If we the current text selection changes to include this element
    // DURING e.g. a mousedown, then we don't want the mouseup to "count", as it were,
    // because its only purpose was selecting text, not clicking buttons.
    //
    // To catch this, any time the text selection includes us while in the middle
    // of a click, this flag is set, which cancels the activation of a press.
    // The flag is reset any time the selection is empty or the button is
    // no longer active.

    const [textSelectedDuringActivation, setTextSelectedDuringActivation] = useState(false);
    useGlobalHandler(document, "selectionchange", e => {
      setTextSelectedDuringActivation(active == 0 ? false : nodeHasSelectedText(getElement()));
    });
    useEffect(() => {
      if (active == 0) setTextSelectedDuringActivation(false);
    }, [active == 0]);
    const onActiveStart = useStableCallback(e => {
      setActive(a => ++a);
    });
    const onActiveStop = useStableCallback(e => {
      setActive(a => Math.max(0, --a));

      if (textSelectedDuringActivation) {
        e.preventDefault();
        return;
      }

      if (getActive() <= 0) {
        handlePress(e);
      }
    });
    const handlePress = useStableCallback(e => {
      if (onClickSync) {
        // Note: The element is focused here because of iOS Safari.
        //
        // It's always iOS Safari.
        //
        // iOS Safari (tested on 12) downright refuses to allow 
        // elements to be manually focused UNLESS it happens within
        // an event handler like this.  It also doesn't focus
        // buttons by default when clicked, tapped, etc.
        //
        // If it becomes problematic that button-likes explicitly become
        // focused when they are pressed, then an alternative solution for
        // the question of "how do menu buttons keep their menus open"
        // and other focus-related nonsense needs to be figured out.
        //
        // For iOS Safari.
        //
        const element = getElement();
        if (element && "focus" in element) element === null || element === void 0 ? void 0 : element.focus();
        e.preventDefault();
        pulse();
        onClickSync(e);
      }
    });
    const onMouseDown = excludes("click", exclude) ? undefined : e => {
      // Stop double clicks from selecting text in an component that's *supposed* to be acting like a button,
      // but also don't prevent the user from selecting that text manually if they really want to
      // (which user-select: none would do, but cancelling a double click on mouseDown doesn't)
      if (e.detail > 1) e.preventDefault();
      if (e.button === 0) onActiveStart(e);
    };
    const onMouseUp = excludes("click", exclude) ? undefined : e => {
      if (e.button === 0 && active > 0) onActiveStop(e);
    };

    const onBlur = e => {
      setActive(0);
    };

    const onMouseOut = excludes("click", exclude) ? undefined : onBlur;
    const onKeyDown = excludes("space", exclude) && excludes("enter", exclude) ? undefined : e => {
      if (e.key == " " && onClickSync && !excludes("space", exclude)) {
        // We don't actually activate it on a space keydown
        // but we do preventDefault to stop the page from scrolling.
        onActiveStart(e);
        e.preventDefault();
      }

      if (e.key == "Enter" && !excludes("enter", exclude)) {
        e.preventDefault();
        onActiveStart(e);
        onActiveStop(e);
      }
    };
    const onKeyUp = excludes("space", exclude) ? undefined : e => {
      if (e.key == " " && !excludes("space", exclude)) onActiveStop(e);
    };

    const onClick = e => {
      e.preventDefault();

      if (e.detail > 1) {
        e.stopImmediatePropagation();
        e.stopPropagation();
      }
    };

    return props => useRefElementProps(useMergedProps()({
      onKeyDown,
      onKeyUp,
      onBlur,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      onClick,
      ...{
        "data-pseudo-active": active ? "true" : undefined
      }
    }, props));
  }
  function useAriaButton({
    tag,
    pressed,
    onPress
  }) {
    function useAriaButtonProps({
      "aria-pressed": ariaPressed,
      tabIndex,
      role,
      ...p
    }) {
      const props = useButtonLikeEventHandlers(e => onPress === null || onPress === void 0 ? void 0 : onPress(enhanceEvent(e, {
        pressed: pressed == null ? null : !pressed
      })), undefined)(p);
      const buttonProps = {
        role,
        tabIndex,
        "aria-pressed": ariaPressed !== null && ariaPressed !== void 0 ? ariaPressed : pressed === true ? "true" : pressed === false ? "false" : undefined
      };
      const divProps = { ...buttonProps,
        tabIndex: tabIndex !== null && tabIndex !== void 0 ? tabIndex : 0,
        role: role !== null && role !== void 0 ? role : "button"
      };
      const anchorProps = { ...divProps
      };

      switch (tag) {
        case "button":
          return useMergedProps()(buttonProps, props);

        case "a":
          return useMergedProps()(anchorProps, props);

        default:
          return useMergedProps()(divProps, props);
      }
    }

    return {
      useAriaButtonProps
    };
  }

  function useAriaAccordion({
    expandedIndex,
    setExpandedIndex
  }) {
    const [lastFocusedIndex, setLastFocusedIndex, getLastFocusedIndex] = useState(0);
    const stableSetExpandedIndex = useStableCallback(setExpandedIndex !== null && setExpandedIndex !== void 0 ? setExpandedIndex : () => {});
    const {
      managedChildren: managedAccordionSections,
      useManagedChild: useManagedChildSection
    } = useChildManager();
    const navigateToFirst = useCallback(() => {
      setLastFocusedIndex(0);
    }, []);
    const navigateToLast = useCallback(() => {
      setLastFocusedIndex(managedAccordionSections.length - 1);
    }, []);
    const navigateToPrev = useCallback(() => {
      setLastFocusedIndex(i => (i !== null && i !== void 0 ? i : 0) - 1);
    }, []);
    const navigateToNext = useCallback(() => {
      setLastFocusedIndex(i => (i !== null && i !== void 0 ? i : 0) + 1);
    }, []);
    const {
      useLinearNavigationChild
    } = useLinearNavigation({
      managedChildren: managedAccordionSections,
      navigationDirection: "block",
      index: getLastFocusedIndex(),
      navigateToFirst,
      navigateToLast,
      navigateToPrev,
      navigateToNext
    }); // Any time list management changes the focused index, manually focus the child
    // TODO: Can this be cut?

    useLayoutEffect(() => {
      var _managedAccordionSect;

      if (lastFocusedIndex != null && lastFocusedIndex >= 0) (_managedAccordionSect = managedAccordionSections[lastFocusedIndex]) === null || _managedAccordionSect === void 0 ? void 0 : _managedAccordionSect.focus();
    }, [lastFocusedIndex]);
    useChildFlag({
      activatedIndex: expandedIndex,
      managedChildren: managedAccordionSections,
      setChildFlag: (i, open) => {
        var _managedAccordionSect2;

        return (_managedAccordionSect2 = managedAccordionSections[i]) === null || _managedAccordionSect2 === void 0 ? void 0 : _managedAccordionSect2.setOpenFromParent(open);
      },
      getChildFlag: i => {
        var _managedAccordionSect3, _managedAccordionSect4;

        return (_managedAccordionSect3 = (_managedAccordionSect4 = managedAccordionSections[i]) === null || _managedAccordionSect4 === void 0 ? void 0 : _managedAccordionSect4.getOpenFromParent()) !== null && _managedAccordionSect3 !== void 0 ? _managedAccordionSect3 : null;
      }
    });
    const useAriaAccordionSection = useCallback(args => {
      var _ref, _args$open;

      const index = args.index;
      const [openFromParent, setOpenFromParent, getOpenFromParent] = useState(null);
      const {
        randomId: bodyRandomId,
        useRandomIdProps: useBodyRandomIdProps,
        useReferencedIdProps: useReferencedBodyIdProps
      } = useRandomId({
        prefix: "aria-accordion-section-body-"
      });
      const {
        randomId: headRandomId,
        useRandomIdProps: useHeadRandomIdProps,
        useReferencedIdProps: useReferencedHeadIdProps
      } = useRandomId({
        prefix: "aria-accordion-section-header-"
      });
      let open = (_ref = (_args$open = args.open) !== null && _args$open !== void 0 ? _args$open : openFromParent) !== null && _ref !== void 0 ? _ref : null; // TODO: Convert to use useManagedChild so that this hook 
      // is stable without (directly) depending on the open state.

      const useAriaAccordionSectionHeader = useCallback(function useAriaAccordionSectionHeader({
        tag
      }) {
        const {
          useRefElementProps,
          getElement
        } = useRefElement({});
        const focus = useCallback(() => {
          var _getElement;

          (_getElement = getElement()) === null || _getElement === void 0 ? void 0 : _getElement.focus();
        }, []);
        const {
          useManagedChildProps
        } = useManagedChildSection({
          index,
          open,
          setOpenFromParent,
          getOpenFromParent,
          focus
        });
        const {
          useLinearNavigationChildProps
        } = useLinearNavigationChild({
          index
        });

        function useAriaAccordionSectionHeaderProps({
          ["aria-expanded"]: ariaExpanded,
          ["aria-disabled"]: ariaDisabled,
          ...props
        }) {
          const onFocus = () => {
            setLastFocusedIndex(args.index);
          };

          let onClick = () => {
            if (getOpenFromParent()) stableSetExpandedIndex(null);else stableSetExpandedIndex(args.index);
          };

          let retB = useMergedProps()({
            tabIndex: 0
          }, useButtonLikeEventHandlers(onClick, undefined)(props));
          let ret3 = useMergedProps()(useHeadRandomIdProps(useReferencedBodyIdProps("aria-controls")({
            "aria-expanded": ariaExpanded !== null && ariaExpanded !== void 0 ? ariaExpanded : (!!open).toString(),
            "aria-disabled": ariaDisabled !== null && ariaDisabled !== void 0 ? ariaDisabled : open ? "true" : undefined,
            ...useRefElementProps(useManagedChildProps(retB))
          })), {
            onFocus
          });
          return useLinearNavigationChildProps(ret3);
        }
        return {
          useAriaAccordionSectionHeaderProps
        };
      }, [index, open]);
      const useAriaAccordionSectionBody = useCallback(function useAriaAccordionSectionBody() {
        function useAriaAccordionSectionBodyProps({
          role,
          ...props
        }) {
          let ret1 = useReferencedHeadIdProps("aria-labelledby")({
            role: role !== null && role !== void 0 ? role : "region",
            ...props
          });
          let ret2 = useBodyRandomIdProps(ret1);
          return ret2;
        }
        return {
          useAriaAccordionSectionBodyProps
        };
      }, []);
      return {
        expanded: open,
        useAriaAccordionSectionHeader,
        useAriaAccordionSectionBody
      };
    }, [useLinearNavigationChild]);
    return {
      useAriaAccordionSection
    };
  }

  /**
   * Adds an ID and "aria-labelledby" for two elements, an "input" element and a "label" element.
   *
   * Returns the `useReferencedIdProps` hooks if you need to also add other ID-referencing attributes, like `for`
   *
   * @see useInputLabel
   */

  function useGenericLabel({
    labelPrefix,
    inputPrefix,
    backupText
  } = {
    labelPrefix: "label-",
    inputPrefix: "input-"
  }) {
    const [labelElement, setLabelElement] = useState$1(null);
    const [inputElement, setInputElement] = useState$1(null);
    const {
      getElement: getLabelElement,
      useRefElementProps: useLabelRefElementProps
    } = useRefElement({
      onElementChange: setLabelElement
    });
    const {
      getElement: getInputElement,
      useRefElementProps: useInputRefElementProps
    } = useRefElement({
      onElementChange: setInputElement
    });
    const {
      useRandomIdProps: useLabelRandomIdProps,
      id: labelId,
      randomId: labelRandomId,
      useReferencedIdProps: useReferencedLabelIdProps
    } = useRandomId({
      prefix: labelPrefix
    });
    const {
      useRandomIdProps: useInputRandomIdProps,
      id: inputId,
      randomId: inputRandomId,
      useReferencedIdProps: useReferencedInputIdProps
    } = useRandomId({
      prefix: inputPrefix
    });
    const labelHasMounted = !!labelElement;
    const useGenericLabelLabel = useCallback(function useGenericLabelLabel() {
      return {
        useGenericLabelLabelProps: props => {
          return useLabelRandomIdProps(useLabelRefElementProps(props));
        }
      };
    }, []);
    const useGenericLabelInput = useCallback(function useGenericLabelInput() {
      return {
        useGenericLabelInputProps: ({
          "aria-labelledby": ariaLabelledby,
          "aria-label": ariaLabel,
          ...props
        }) => {
          var _ref;

          return useInputRandomIdProps(useReferencedLabelIdProps("aria-labelledby")(useInputRefElementProps(useMergedProps()({
            "aria-label": (_ref = !labelHasMounted ? backupText : ariaLabel) !== null && _ref !== void 0 ? _ref : ariaLabel
          }, props))));
        }
      };
    }, [labelHasMounted]);
    return {
      useGenericLabelInput,
      useGenericLabelLabel,
      useReferencedLabelIdProps,
      useReferencedInputIdProps,
      labelId,
      inputId,
      labelElement,
      inputElement,
      getLabelElement,
      getInputElement
    };
  }
  /**
   * Handles the attributes `id`, `for`, and `aria-labelledby` for to related elements.
   *
   * It's assumed that the label is an `HTMLLabelElement`, and the input is something for which
   * the `for` attribute can reference.
   *
   */

  function useInputLabel({
    labelPrefix,
    inputPrefix
  } = {
    labelPrefix: "label-",
    inputPrefix: "input-"
  }) {
    const {
      useGenericLabelInput,
      useGenericLabelLabel,
      useReferencedInputIdProps,
      useReferencedLabelIdProps,
      inputId,
      labelId,
      inputElement,
      getInputElement,
      labelElement,
      getLabelElement
    } = useGenericLabel({
      labelPrefix,
      inputPrefix
    });
    const useInputLabelLabel = useCallback(function useInputLabelLabel({
      tag
    }) {
      const {
        useGenericLabelLabelProps
      } = useGenericLabelLabel();
      return {
        useInputLabelLabelProps(props) {
          const withFor = useReferencedInputIdProps("for")(props);
          const withoutFor = props;
          return useGenericLabelLabelProps(tag == "label" ? withFor : withoutFor);
        }

      };
    }, [useGenericLabelInput]);
    const useInputLabelInput = useCallback(function useInputLabelInput() {
      const {
        useGenericLabelInputProps
      } = useGenericLabelInput();
      return {
        useInputLabelInputProps(props) {
          return useGenericLabelInputProps(props);
        }

      };
    }, [useGenericLabelLabel]);
    return {
      useInputLabelLabel,
      useInputLabelInput,
      labelId,
      inputId,
      inputElement,
      labelElement,
      getInputElement,
      getLabelElement
    };
  }

  const handlesInput = (tag, labelPosition, which) => {
    if (labelPosition === "separate") {
      if (which === "input-element") return true;else if (which === "label-element") return tag != "input";
    } else if (labelPosition === "wrapping") {
      if (which === "input-element") return false;
      if (which == "label-element") return true;
    }
  };
  /**
   * Handles label type (wrapping or separate) for checkboxes, radios, switches, etc.
   * @param param0
   * @returns
   */


  function useCheckboxLike({
    checked,
    disabled,
    labelPosition,
    onInput,
    role
  }) {
    const stableOnInput = useStableCallback(e => {
      e.preventDefault();
      onInput === null || onInput === void 0 ? void 0 : onInput(e);
    });
    const {
      inputId,
      labelId,
      useInputLabelInput: useILInput,
      useInputLabelLabel: useILLabel,
      getLabelElement,
      getInputElement
    } = useInputLabel({
      labelPrefix: "aria-checkbox-label-",
      inputPrefix: "aria-checkbox-input-"
    });
    const useCheckboxLikeInputElement = useCallback(function useCheckboxInputElement({
      tag
    }) {
      const {
        useInputLabelInputProps: useILInputProps
      } = useILInput();
      const {
        useRefElementProps,
        getElement
      } = useRefElement({}); // onClick and onChange are a bit messy, so we need to
      // *always* make sure that the visible state is correct
      // after all the event dust settles.
      // See https://github.com/preactjs/preact/issues/2745,
      // and https://github.com/preactjs/preact/issues/1899#issuecomment-525690194

      useEffect$1(() => {
        const element = getElement();

        if (element && tag == "input") {
          element.checked = checked;
        }
      }, [tag, checked]);
      return {
        getInputElement: getElement,
        useCheckboxLikeInputElementProps
      };

      function useCheckboxLikeInputElementProps({ ...p0
      }) {
        // For some reason, Chrome won't fire onInput events for radio buttons that are tabIndex=-1??
        // Needs investigating, but onInput works fine in Firefox
        // TODO
        let props = useButtonLikeEventHandlers(disabled || !handlesInput(tag, labelPosition, "input-element") ? undefined : stableOnInput, undefined)({});
        if (tag == "input") props.onInput = e => e.preventDefault();
        props = useRefElementProps(useILInputProps(props));

        if (labelPosition == "wrapping") {
          // Because the wrapped label handles all interactions,
          // we need to make sure this element can't be interacted with
          // even if it's an input element.
          props.inert = true;
          props.tabIndex = -1;

          props.onFocus = e => getLabelElement().focus();
        } else {
          if (tag === "input") {
            props.checked = checked;
          } else {
            props.role = role;
            props.tabIndex = 0;
            props["aria-checked"] = checked ? "true" : undefined;
          }

          props["aria-disabled"] = disabled.toString();
        } // Make sure that label clicks can't affect the checkbox while it's disabled


        props.onClick = disabled ? e => {
          e.preventDefault();
        } : props.onClick;
        return useMergedProps()(p0, props);
      }
    }, [useILInput, role, labelPosition, disabled, checked]);
    const useCheckboxLikeLabelElement = useCallback(function useCheckboxLabelElement({
      tag
    }) {
      const {
        useInputLabelLabelProps: useILLabelProps
      } = useILLabel({
        tag
      });

      function useCheckboxLikeLabelElementProps({ ...p0
      }) {
        let newProps = useButtonLikeEventHandlers(disabled || !handlesInput(tag, labelPosition, "label-element") ? undefined : stableOnInput, undefined)({});

        if (labelPosition == "wrapping") {
          newProps.tabIndex = 0;
          newProps.role = role;
          newProps["aria-disabled"] = disabled.toString();
          newProps["aria-checked"] = checked.toString();
        } // Just make sure that label clicks can't affect the checkbox while it's disabled


        newProps.onClick = disabled ? e => {
          e.preventDefault();
        } : newProps.onClick;
        return useMergedProps()(newProps, useILLabelProps(p0));
      }

      return {
        useCheckboxLikeLabelElementProps
      };
    }, [useILLabel, disabled, checked, role, labelPosition]);
    return {
      useCheckboxLikeInputElement,
      useCheckboxLikeLabelElement,
      getLabelElement,
      getInputElement
    };
  }

  function useAriaCheckbox({
    labelPosition,
    checked,
    onInput,
    disabled
  }) {
    const onInputEnhanced = e => onInput === null || onInput === void 0 ? void 0 : onInput(enhanceEvent(e, {
      checked: !checked
    }));

    const {
      getInputElement,
      getLabelElement,
      useCheckboxLikeInputElement,
      useCheckboxLikeLabelElement
    } = useCheckboxLike({
      checked: !!checked,
      labelPosition,
      role: "checkbox",
      disabled,
      onInput: onInputEnhanced
    });
    const useCheckboxInputElement = useCallback(function useCheckboxInputElement({
      tag
    }) {
      const {
        getInputElement,
        useCheckboxLikeInputElementProps
      } = useCheckboxLikeInputElement({
        tag
      });
      const isMixed = checked == "mixed";
      useEffect$1(() => {
        const inputElement = getInputElement();

        if (inputElement && tag === "input") {
          inputElement.indeterminate = isMixed;
        }
      }, [isMixed, tag]);
      return {
        useCheckboxInputElementProps
      };

      function useCheckboxInputElementProps({ ...p0
      }) {
        var _props$checked;

        let props = useCheckboxLikeInputElementProps(p0);
        (_props$checked = props.checked) !== null && _props$checked !== void 0 ? _props$checked : props.checked = !!checked;
        if (tag == "input") props.type = "checkbox";
        return props;
      }
    }, [useCheckboxLikeInputElement, checked, labelPosition, disabled]);
    const useCheckboxLabelElement = useCallback(function useCheckboxLabelElement({
      tag
    }) {
      const {
        useCheckboxLikeLabelElementProps
      } = useCheckboxLikeLabelElement({
        tag
      });

      function useCheckboxLabelElementProps({ ...props
      }) {
        return useCheckboxLikeLabelElementProps(props);
      }
      return {
        useCheckboxLabelElementProps
      };
    }, [useCheckboxLikeLabelElement, disabled, labelPosition]);
    return {
      useCheckboxInputElement,
      useCheckboxLabelElement
    };
  }

  /**
   * Adds event handlers for a modal-like soft-dismiss interaction.
   *
   * That is, any clicks or taps outside of the given component,
   * or any time the Escape key is pressed within the component,
   * (with various browser oddities regarding clicks on blank or inert areas handled)
   * the component will request to close itself.
   *
   * Of course, if you don't do anything in the `onClose` function,
   * it won't be a soft dismiss anymore.
   *
   * @param param0
   * @returns
   */

  function useSoftDismiss({
    onClose,
    getElements
  }) {
    function onBackdropClick(e) {
      // Basically, "was this event fired on the root-most element, or at least an element not contained by the modal?"
      // Either could be how the browser handles these sorts of "interacting with nothing" events.
      if (e.target == document.documentElement) {
        onClose("backdrop");
      }

      let elements = getElements();

      if (elements && e.target instanceof Element) {
        if (!Array.isArray(elements)) elements = [elements];
        let foundInsideClick = false;

        for (let element of elements) {
          if (element.contains(e.target)) {
            foundInsideClick = true;
            break;
          }
        }

        if (!foundInsideClick) onClose("backdrop");
      }
    } // Since everything else is inert, we listen for captured clicks on the window
    // (we don't use onClick since that doesn't fire when clicked on empty/inert areas)
    // Note: We need a *separate* touch event on mobile Safari, because
    // it doesn't let click events bubble or be captured from traditionally non-interactive elements,
    // but touch events work as expected.


    useGlobalHandler(window, "mousedown", !open ? null : onBackdropClick, {
      capture: true
    });
    useGlobalHandler(window, "touchstart", !open ? null : onBackdropClick, {
      capture: true
    });
    useGlobalHandler(document, "keydown", e => {
      if (e.key === "Escape") {
        onClose("escape");
      }
    });
  }
  /**
   * A generic modal hook, used by modal dialogs, but can also
   * be used by anything that's modal with a backdrop.
   * @param param0
   * @returns
   */

  function useModal({
    open,
    onClose
  }) {
    const stableOnClose = useStableCallback(onClose);
    const [modalDescribedByBody, setModalDescribedByBody] = useState(false);
    useHideScroll(open);
    const {
      id: modalId,
      useRandomIdProps: useModalIdProps,
      useReferencedIdProps: useModalReferencingIdProps
    } = useRandomId({
      prefix: "aria-modal-"
    });
    const {
      id: bodyId,
      useRandomIdProps: useBodyIdProps,
      useReferencedIdProps: useBodyReferencingIdProps
    } = useRandomId({
      prefix: "aria-modal-body-"
    });
    const {
      id: titleId,
      useRandomIdProps: useTitleIdProps,
      useReferencedIdProps: useTitleReferencingIdProps
    } = useRandomId({
      prefix: "aria-modal-title-"
    });
    const {
      useRefElementProps: useModalRefElement,
      getElement: getModalElement
    } = useRefElement({});
    useSoftDismiss({
      onClose: stableOnClose,
      getElements: getModalElement
    });
    const useModalBackdrop = useCallback(function useModalBackdrop() {
      function useModalBackdropProps(props) {
        return useMergedProps()({
          onPointerUp: () => stableOnClose("backdrop")
        }, props);
      }

      return {
        useModalBackdropProps
      };
    }, []);

    const useModalProps = function ({
      "aria-modal": ariaModal,
      role,
      ...p0
    }) {
      const {
        useFocusTrapProps
      } = useFocusTrap({
        trapActive: open
      });
      const p1 = useTitleReferencingIdProps("aria-labelledby")(p0);
      const p2 = useModalIdProps(p1);
      const pFinal = useBodyReferencingIdProps("aria-describedby")(p2);
      return useFocusTrapProps(useMergedProps()(useModalRefElement({
        role: "dialog"
      }), modalDescribedByBody ? pFinal : p2));
    };

    const useModalTitle = useCallback(function useModalTitle() {
      const useModalTitleProps = function (props) {
        return useTitleIdProps(props);
      };

      return {
        useModalTitleProps
      };
    }, []);
    const useModalBody = useCallback(function useModalBody({
      descriptive
    }) {
      setModalDescribedByBody(descriptive);

      const useModalBodyProps = function (props) {
        return useBodyIdProps(props);
      };

      return {
        useModalBodyProps
      };
    }, []);
    return {
      useModalProps,
      useModalTitle,
      useModalBody,
      useModalBackdrop
    };
  }
  /**
   * Allows for hiding the scroll bar of the root HTML element
   * without shifting the layout of the page more than adding a fow pixels
   * of padding to the root element if necessary.
   * @param hideScroll
   */

  function useHideScroll(hideScroll) {
    const [scrollbarWidth, setScrollbarWidth, getScrollbarWidth] = useState(null);
    useEffect$1(() => {
      if (hideScroll) {
        let widthWithScrollBar = document.documentElement.scrollWidth;
        document.documentElement.classList.add("document-scroll-hidden");
        document.documentElement.dataset["scrollHiders"] = (+(document.documentElement.dataset["scrollHiders"] || "0") + 1).toString();
        let widthWithoutScrollBar = document.documentElement.scrollWidth;
        let scrollbarWidth = widthWithoutScrollBar - widthWithScrollBar; // Failsafe -- if this measuring trick does something unexpected, just ignore it

        if (scrollbarWidth > 80) scrollbarWidth = 0;
        document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
        setScrollbarWidth(scrollbarWidth);
        return () => {
          document.documentElement.dataset["scrollHiders"] = (+(document.documentElement.dataset["scrollHiders"] || "0") - 1).toString();

          if (document.documentElement.dataset["scrollHiders"] == "0") {
            document.documentElement.removeAttribute("data-scroll-hiders");
            document.documentElement.classList.remove("document-scroll-hidden");
          }
        };
      }
    }, [hideScroll]);
    return {
      scrollbarWidth,
      getScrollbarWidth
    };
  }

  function useAriaDialog({
    open,
    onClose
  }) {
    // TODO: Differences between dialog and modal go here, presumably.
    // Non-modal dialogs need to be able to be repositioned, etc.
    const {
      useModalBackdrop,
      useModalBody,
      useModalProps,
      useModalTitle
    } = useModal({
      open,
      onClose
    });
    const useDialogBackdrop = useCallback(() => {
      const {
        useModalBackdropProps
      } = useModalBackdrop();
      return {
        useDialogBackdropProps: useModalBackdropProps
      };
    }, [useModalBackdrop]);
    const useDialogBody = useCallback(({
      descriptive
    }) => {
      const {
        useModalBodyProps
      } = useModalBody({
        descriptive
      });
      return {
        useDialogBodyProps: useModalBodyProps
      };
    }, [useModalBackdrop]);
    const useDialogProps = useModalProps;
    const useDialogTitle = useCallback(() => {
      const {
        useModalTitleProps
      } = useModalTitle();
      return {
        useDialogTitleProps: useModalTitleProps
      };
    }, [useModalTitle]);
    return {
      useDialogProps,
      useDialogTitle,
      useDialogBody,
      useDialogBackdrop
    };
  }

  function useDrawer({
    open,
    onClose
  }) {
    // TODO: Drawers are not always modal.
    const {
      useModalBackdrop,
      useModalBody,
      useModalProps,
      useModalTitle
    } = useModal({
      open,
      onClose
    });
    const useDrawerBackdrop = useCallback(() => {
      const {
        useModalBackdropProps
      } = useModalBackdrop();
      return {
        useDrawerBackdropProps: useModalBackdropProps
      };
    }, [useModalBackdrop]);
    const useDrawerBody = useCallback(({
      descriptive
    }) => {
      const {
        useModalBodyProps
      } = useModalBody({
        descriptive
      });
      return {
        useDrawerBodyProps: useModalBodyProps
      };
    }, [useModalBackdrop]);
    const useDrawerProps = useModalProps;
    const useDrawerTitle = useCallback(() => {
      const {
        useModalTitleProps
      } = useModalTitle();
      return {
        useDrawerTitleProps: useModalTitleProps
      };
    }, [useModalTitle]);
    return {
      useDrawerProps,
      useDrawerTitle,
      useDrawerBody,
      useDrawerBackdrop
    };
  }

  function useAriaListboxSingle({
    selectedIndex,
    onSelect,
    selectionMode,
    ...args
  }) {
    const [anyItemsFocused, setAnyItemsFocused, getAnyItemsFocused] = useState(false);
    const {
      useGenericLabelInput,
      useGenericLabelLabel,
      useReferencedInputIdProps,
      useReferencedLabelIdProps,
      inputElement
    } = useGenericLabel({
      labelPrefix: "aria-listbox-label-",
      inputPrefix: "aria-listbox-"
    });
    const {
      useListNavigationChild,
      navigateToIndex,
      managedChildren,
      setTabbableIndex,
      tabbableIndex,
      focusCurrent,
      currentTypeahead,
      invalidTypeahead
    } = useListNavigation({ ...args,
      shouldFocusOnChange: getAnyItemsFocused
    });
    const {
      useGenericLabelInputProps
    } = useGenericLabelInput();
    const stableOnSelect = useStableCallback(onSelect !== null && onSelect !== void 0 ? onSelect : () => {}); // Track whether the currently focused element is a child of the list box parent element.
    // When it's not, we reset the tabbable index back to the currently selected element.

    useActiveElement({
      onActiveElementChange: activeElement => setAnyItemsFocused(!!(inputElement !== null && inputElement !== void 0 && inputElement.contains(activeElement)))
    });
    useEffect$1(() => {
      if (!anyItemsFocused) setTabbableIndex(selectedIndex);
    }, [anyItemsFocused, selectedIndex, setTabbableIndex]);
    useChildFlag({
      activatedIndex: selectedIndex,
      managedChildren,
      setChildFlag: (i, selected) => {
        var _managedChildren$i;

        return (_managedChildren$i = managedChildren[i]) === null || _managedChildren$i === void 0 ? void 0 : _managedChildren$i.setSelected(selected);
      },
      getChildFlag: i => {
        var _managedChildren$i$ge, _managedChildren$i2;

        return (_managedChildren$i$ge = (_managedChildren$i2 = managedChildren[i]) === null || _managedChildren$i2 === void 0 ? void 0 : _managedChildren$i2.getSelected()) !== null && _managedChildren$i$ge !== void 0 ? _managedChildren$i$ge : null;
      }
    });
    useLayoutEffect(() => {
      navigateToIndex(selectedIndex);
    }, [selectedIndex, managedChildren.length]);
    const childCount = managedChildren.length;
    const useListboxSingleItem = useCallback(info => {
      const [selected, setSelected, getSelected] = useState(null);
      const {
        tabbable,
        useListNavigationSiblingProps,
        useListNavigationChildProps
      } = useListNavigationChild({
        setSelected,
        getSelected,
        ...info
      });
      const {
        getElement,
        useRefElementProps
      } = useRefElement({});
      const index = info.index;
      useEffect$1(() => {
        const element = getElement();

        if (element && tabbable && selectionMode == "focus") {
          stableOnSelect === null || stableOnSelect === void 0 ? void 0 : stableOnSelect({
            target: element,
            currentTarget: element,
            [EventDetail]: {
              selectedIndex: index
            }
          });
        }
      }, [tabbable, selectionMode, index]);
      return {
        useListboxSingleItemProps,
        tabbable,
        selected,
        getSelected
      };

      function useListboxSingleItemProps(props) {
        const newProps = useButtonLikeEventHandlers(e => {
          navigateToIndex(info.index);
          const element = getElement();
          if (element) stableOnSelect === null || stableOnSelect === void 0 ? void 0 : stableOnSelect({
            target: element,
            currentTarget: element,
            [EventDetail]: {
              selectedIndex: index
            }
          });
          e.preventDefault();
        }, undefined)({});
        props.role = "option";
        props["aria-setsize"] = childCount.toString();
        props["aria-posinset"] = (info.index + 1).toString();
        props["aria-selected"] = (selected !== null && selected !== void 0 ? selected : false).toString();
        return useListNavigationChildProps(useMergedProps()(newProps, useRefElementProps(props)));
      }
    }, [useListNavigationChild, selectionMode, childCount]);
    const useListboxSingleLabel = useCallback(function useListboxSingleLabel() {
      function useListboxSingleLabelProps(props) {
        const {
          useGenericLabelLabelProps
        } = useGenericLabelLabel();
        useGenericLabelLabelProps(props);
      }

      return {
        useListboxSingleLabelProps
      };
    }, [useGenericLabelLabel]);
    return {
      useListboxSingleItem,
      useListboxSingleProps,
      useListboxSingleLabel,
      tabbableIndex,
      focus: focusCurrent,
      currentTypeahead,
      invalidTypeahead
    };

    function useListboxSingleProps(props) {
      props.role = "listbox";
      return useGenericLabelInputProps(props);
    }
  }

  function useAriaMenu({
    collator,
    keyNavigation,
    noTypeahead,
    noWrap,
    typeaheadTimeout,
    ...args
  }) {
    const [focusTrapActive, setFocusTrapActive] = useState(null);
    let onClose = args.onClose;
    let onOpen = args.onOpen;
    let menubar = args.menubar;
    let open = menubar ? true : args.open;
    const stableOnClose = useStableCallback(onClose !== null && onClose !== void 0 ? onClose : () => {}); // TODO: It's awkward that the button focus props are out here where we don't have its type,
    // but focus management is super sensitive, and even waiting for a useLayoutEffect to sync state here
    // would be too late, so it would look like there's a moment between menu focus lost and button focus gained
    // where nothing is focused. 

    const {
      useHasFocusProps: useMenuHasFocusProps,
      getLastFocusedInner: getMenuLastFocusedInner
    } = useHasFocus({
      onLastFocusedInnerChanged: onMenuOrButtonLostLastFocus
    });
    const {
      useHasFocusProps: useButtonHasFocusProps,
      getLastFocusedInner: getButtonLastFocusedInner
    } = useHasFocus({
      onLastFocusedInnerChanged: onMenuOrButtonLostLastFocus
    });
    const {
      managedChildren,
      useListNavigationChild,
      tabbableIndex,
      focusCurrent: focusMenu
    } = useListNavigation({
      collator,
      keyNavigation,
      noTypeahead,
      noWrap,
      typeaheadTimeout,
      shouldFocusOnChange: useCallback(() => getMenuLastFocusedInner() || getButtonLastFocusedInner(), [])
    });
    const {
      useRandomIdProps: useMenuIdProps,
      useReferencedIdProps: useMenuIdReferencingProps
    } = useRandomId({
      prefix: "aria-menu-"
    });
    const [openerElement, setOpenerElement, getOpenerElement] = useState(null);
    const {
      getElement: getButtonElement,
      useRefElementProps: useButtonRefElementProps
    } = useRefElement({
      onElementChange: setOpenerElement
    });
    const {
      getElement: getMenuElement,
      useRefElementProps: useMenuRefElementProps
    } = useRefElement({});
    useSoftDismiss({
      onClose: stableOnClose,
      getElements: () => [getButtonElement(), getMenuElement()]
    });
    useEffect$1(() => {
      setFocusTrapActive(open);
    }, [open]);
    const focusMenuStable = useStableCallback(focusMenu !== null && focusMenu !== void 0 ? focusMenu : () => {});
    useEffect$1(() => {
      if (focusTrapActive) {
        focusMenuStable === null || focusMenuStable === void 0 ? void 0 : focusMenuStable();
      } else if (focusTrapActive === false) {
        var _getOpenerElement;

        if (getMenuLastFocusedInner()) (_getOpenerElement = getOpenerElement()) === null || _getOpenerElement === void 0 ? void 0 : _getOpenerElement.focus({
          preventScroll: true
        });
      } else ;
    }, [focusTrapActive]); // Focus management is really finicky, and there's always going to be 
    // an edge case where nothing's focused for two consecutive frames 
    // on iOS or whatever, which would immediately close the menu 
    // any time it's been opened. So any time it *looks* like we should close,
    // try waiting 100ms. If it's still true then, then yeah, we should close.

    function onMenuOrButtonLostLastFocus() {
      setTimeout(() => {
        if (!getMenuLastFocusedInner() && !getButtonLastFocusedInner()) {
          onClose === null || onClose === void 0 ? void 0 : onClose();
        }
      }, 100);
    } // A menu sentinal is a hidden but focusable element that comes at the start or end of the element
    // that, when activated or focused over, closes the menu.
    // (if focused within 100ms of the open prop changing, instead of
    // closing the menu, focusing the sentinel immediately asks the menu to focus itself).
    // This exists because while mouse users can click out of a menu
    // and keyboard users can escape to close the menu,
    // screen readers and other input methods that don't use those two become stuck.


    const useMenuSentinel = useCallback(() => {
      const [firstSentinelIsActive, setFirstSentinelIsActive] = useState(false);
      useTimeout({
        callback: () => {
          setFirstSentinelIsActive(open);
        },
        timeout: 100,
        triggerIndex: `${firstSentinelIsActive}`
      });
      const onFocus = firstSentinelIsActive ? () => stableOnClose() : () => focusMenu === null || focusMenu === void 0 ? void 0 : focusMenu();

      const onClick = () => stableOnClose();

      return {
        useMenuSentinelProps: function (p) {
          return useMergedProps()({
            onFocus,
            onClick
          }, p);
        }
      };
    }, [focusMenu, open]);
    const useMenuButton = useCallback(({}) => {
      return {
        useMenuButtonProps: function (p) {
          let props = useButtonRefElementProps(useMergedProps()({}, useMenuIdReferencingProps("aria-controls")(useButtonHasFocusProps(p))));
          props["aria-haspopup"] = "menu";
          props["aria-expanded"] = open ? "true" : undefined;
          return props;
        }
      };
    }, [open, onClose, onOpen, useMenuIdReferencingProps]);
    const useMenuSubmenuItem = useCallback(args => {
      const {
        useMenuProps,
        useMenuButton
      } = useAriaMenu(args);
      const {
        useMenuButtonProps
      } = useMenuButton({
        tag: "li"
      });
      const {
        getElement,
        useRefElementProps
      } = useRefElement({
        onElementChange: setOpenerElement
      });
      return {
        getElement,
        useMenuProps,
        useMenuSubmenuItemProps: function ({ ...props
        }) {
          props.role = "menuitem";
          return useRefElementProps(useMenuButtonProps(useMenuIdReferencingProps("aria-controls")(props)));
        }
      };
    }, []);
    const useMenuItem = useCallback(args => {
      const {
        useListNavigationChildProps
      } = useListNavigationChild(args);

      function useMenuItemProps({ ...props
      }) {
        props.role = "menuitem";
        return useMergedProps()({}, useListNavigationChildProps(props));
      }

      return {
        useMenuItemProps
      };
    }, []);

    function useMenuProps({ ...props
    }) {
      props.role = "menu";

      function onKeyDown(e) {
        if (e.key == "Escape" && onClose) {
          onClose();
        }
      }

      return useMenuIdProps(useMenuHasFocusProps(useMergedProps()({
        onKeyDown
      }, useMenuRefElementProps(props))));
    }

    return {
      useMenuProps,
      useMenuButton,
      useMenuItem,
      useMenuSentinel,
      useMenuSubmenuItem,
      focusMenu
    };
  }

  function useAriaTabs({
    selectionMode,
    selectedIndex,
    onSelect,
    orientation: logicalOrientation,
    ...args
  }) {
    const {
      useHasFocusProps: useTabListHasFocusProps,
      getFocusedInner: getTabListFocusedInner
    } = useHasFocus({});
    const [physicalOrientation, setPhysicalOrientation] = useState("horizontal");
    const {
      getLogicalDirectionInfo,
      convertToPhysicalOrientation,
      useLogicalDirectionProps
    } = useLogicalDirection({
      onLogicalDirectionChange: logicalDirectionInfo => setPhysicalOrientation(convertToPhysicalOrientation(logicalOrientation, logicalDirectionInfo))
    });
    useRandomId({
      prefix: "aria-tab-list-"
    });
    const {
      useRandomIdProps: useTabLabelIdProps,
      useReferencedIdProps: useReferencedTabLabelId
    } = useRandomId({
      prefix: "aria-tab-label-"
    });
    const {
      managedChildren: managedTabs,
      navigateToIndex,
      useListNavigationChild,
      tabbableIndex,
      invalidTypeahead,
      currentTypeahead,
      focusCurrent
    } = useListNavigation({ ...args,
      shouldFocusOnChange: getTabListFocusedInner,
      keyNavigation: logicalOrientation
    });
    const {
      managedChildren: managedPanels,
      useManagedChild: useManagedTabPanel
    } = useChildManager();
    useStableCallback(onSelect);
    const childCount = managedTabs.length;
    useLayoutEffect(() => {
      for (let child of managedTabs) child.setSelectionMode(selectionMode);
    }, [selectionMode]);
    useChildFlag({
      activatedIndex: selectedIndex,
      managedChildren: managedTabs,
      setChildFlag: (i, selected) => {
        var _managedTabs$i;

        return (_managedTabs$i = managedTabs[i]) === null || _managedTabs$i === void 0 ? void 0 : _managedTabs$i.setSelected(selected);
      },
      getChildFlag: i => {
        var _managedTabs$i2;

        return (_managedTabs$i2 = managedTabs[i]) === null || _managedTabs$i2 === void 0 ? void 0 : _managedTabs$i2.getSelected();
      }
    });
    useChildFlag({
      activatedIndex: selectedIndex,
      managedChildren: managedPanels,
      setChildFlag: (i, visible) => {
        var _managedPanels$i;

        return (_managedPanels$i = managedPanels[i]) === null || _managedPanels$i === void 0 ? void 0 : _managedPanels$i.setVisible(visible);
      },
      getChildFlag: i => {
        var _managedPanels$i2;

        return (_managedPanels$i2 = managedPanels[i]) === null || _managedPanels$i2 === void 0 ? void 0 : _managedPanels$i2.getVisible();
      }
    });
    useLayoutEffect(prev => {
      if (selectedIndex != null && selectionMode == "activate") {
        var _managedPanels$select;

        (_managedPanels$select = managedPanels[selectedIndex]) === null || _managedPanels$select === void 0 ? void 0 : _managedPanels$select.focus();
      }
    }, [childCount, selectedIndex, selectionMode]);
    const useTab = useCallback(function useTab(info) {
      const [selectionModeL, setSelectionModeL] = useState(selectionMode);
      const {
        useRefElementProps,
        getElement
      } = useRefElement({});
      const [tabPanelId, setTabPanelId] = useState(undefined);
      const {
        useRandomIdProps: useTabIdProps,
        id: tabId,
        getId: getTabId
      } = useRandomId({
        prefix: "aria-tab-"
      });
      const [selected, setSelected, getSelected] = useState(null);
      const {
        tabbable,
        useListNavigationChildProps,
        useListNavigationSiblingProps
      } = useListNavigationChild({
        setSelected,
        getSelected,
        tabId,
        setTabPanelId,
        setSelectionMode: setSelectionModeL,
        ...info
      });
      const getIndex = useStableGetter(info.index);
      useEffect$1(() => {
        const element = getElement();

        if (tabbable && selectionModeL == "focus") {
          onSelect({
            target: element,
            currentTarget: element,
            [EventDetail]: {
              selectedIndex: getIndex()
            }
          });
        }
      }, [tabbable, selectionMode]);
      useEffect$1(() => {
        var _managedPanels$info$i;

        (_managedPanels$info$i = managedPanels[info.index]) === null || _managedPanels$info$i === void 0 ? void 0 : _managedPanels$info$i.setTabId(tabId);
      }, [tabId, info.index]);

      function useTabProps({ ...props
      }) {
        const newProps = useButtonLikeEventHandlers(e => {
          navigateToIndex(info.index);
          onSelect === null || onSelect === void 0 ? void 0 : onSelect(enhanceEvent(e, {
            selectedIndex: getIndex()
          }));
          e.preventDefault();
        }, undefined)(props);
        newProps.role = "tab";
        newProps["aria-selected"] = (selected !== null && selected !== void 0 ? selected : false).toString();
        newProps["aria-controls"] = tabPanelId;
        return useMergedProps()({}, useTabIdProps(useListNavigationChildProps(useRefElementProps(newProps))));
      }

      return {
        useTabProps,
        selected
      };
    }, []);
    const useTabPanel = useCallback(function usePanel(info) {
      const [shouldFocus, setShouldFocus] = useState(false);
      const [tabId, setTabId] = useState(undefined);
      const [visible, setVisible, getVisible] = useState(null);
      const {
        useRandomIdProps: usePanelIdProps,
        useReferencedIdProps: useReferencedPanelId,
        id: tabPanelId
      } = useRandomId({
        prefix: "aria-tab-panel-"
      });
      const {
        element,
        useManagedChildProps
      } = useManagedTabPanel({ ...info,
        tabPanelId,
        setTabId,
        focus,
        setVisible: setVisible,
        getVisible: getVisible
      });

      function focus() {
        if (getTabListFocusedInner()) {
          setShouldFocus(true);
        }
      }

      useEffect$1(() => {
        if (shouldFocus) {
          element === null || element === void 0 ? void 0 : element.focus({
            preventScroll: true
          });
          setShouldFocus(false);
        }
      }, [element, shouldFocus]);
      useEffect$1(() => {
        var _managedTabs$info$ind;

        (_managedTabs$info$ind = managedTabs[info.index]) === null || _managedTabs$info$ind === void 0 ? void 0 : _managedTabs$info$ind.setTabPanelId(tabPanelId);
      }, [tabPanelId, info.index]);

      function useTabPanelProps({ ...props
      }) {
        var _managedTabs$info$ind2, _props$tabIndex;

        props["aria-labelledby"] = (_managedTabs$info$ind2 = managedTabs[info.index]) === null || _managedTabs$info$ind2 === void 0 ? void 0 : _managedTabs$info$ind2.tabId;
        props.role = "tabpanel";
        (_props$tabIndex = props.tabIndex) !== null && _props$tabIndex !== void 0 ? _props$tabIndex : props.tabIndex = -1; // Make sure the tab panel is tabbable.

        return useMergedProps()({}, usePanelIdProps(useManagedChildProps(props)));
      }

      return {
        useTabPanelProps,
        visible
      };
    }, []);
    const useTabsList = useCallback(function useTabList() {
      function useTabListProps({ ...props
      }) {
        props.role = "tablist";
        props["aria-orientation"] = physicalOrientation;
        return useReferencedTabLabelId("aria-labelledby")(useTabListHasFocusProps(useLogicalDirectionProps(props)));
      }

      return {
        useTabListProps
      };
    }, [physicalOrientation]);
    const useTabsLabel = useCallback(function useTabsLabel() {
      function useTabsLabelProps({ ...props
      }) {
        return useTabLabelIdProps(props);
      }

      return {
        useTabsLabelProps
      };
    }, []);
    return {
      useTab,
      useTabPanel,
      useTabsList,
      useTabsLabel,
      tabbableIndex,
      focusTabList: focusCurrent,
      currentTypeahead,
      invalidTypeahead
    };
  }

  function useAriaTooltip({
    mouseoverDelay
  }) {
    var _mouseoverDelay;

    (_mouseoverDelay = mouseoverDelay) !== null && _mouseoverDelay !== void 0 ? _mouseoverDelay : mouseoverDelay = 400;
    const [open, setOpen, getOpen] = useState(false);
    const [hasAnyMouseover, setHasAnyMouseover] = useState(false); //const [mouseoverIsValid, setMouseoverIsValid] = useState(false);

    const {
      useRandomIdProps: useTooltipIdProps,
      useReferencedIdProps: useTooltipIdReferencingProps
    } = useRandomId({
      prefix: "aria-tooltip-"
    });
    const [triggerFocusedInner, setTriggerFocusedInner, getTriggerFocusedInner] = useState(false);
    const [triggerHasMouseover, setTriggerHasMouseover] = useState(false);
    const [tooltipHasMouseover, setTooltipHasMouseover] = useState(false);
    useTimeout({
      timeout: mouseoverDelay,
      triggerIndex: +triggerHasMouseover + +tooltipHasMouseover,
      callback: () => {
        if (triggerHasMouseover || tooltipHasMouseover) setHasAnyMouseover(true);
      }
    });
    useTimeout({
      timeout: 50,
      triggerIndex: +triggerHasMouseover + +tooltipHasMouseover,
      callback: () => {
        if (!triggerHasMouseover && !tooltipHasMouseover) setHasAnyMouseover(false);
      }
    });
    useEffect$1(() => {
      setOpen(hasAnyMouseover || triggerFocusedInner);
    }, [hasAnyMouseover, triggerFocusedInner]);
    const useTooltipTrigger = useCallback(function useTooltipTrigger() {
      function onPointerEnter(e) {
        setTriggerHasMouseover(true);
      }

      function onPointerLeave(e) {
        setTriggerHasMouseover(false);
      }

      function useTooltipTriggerProps({ ...props
      }) {
        // Note: Though it's important to make sure that focusing activates a tooltip,
        // it's perfectly reasonable that a child element will be the one that's focused,
        // not this one, so we don't set tabIndex=0
        return useTooltipIdReferencingProps("aria-describedby")(useMergedProps()({
          onPointerEnter,
          onPointerLeave
        }, props));
      }

      return {
        useTooltipTriggerProps
      };
    }, [useTooltipIdReferencingProps]);
    const useTooltip = useCallback(function useTooltip() {
      function onPointerEnter(e) {
        setTooltipHasMouseover(true);
      }

      function onPointerLeave(e) {
        setTooltipHasMouseover(false);
      }

      function useTooltipProps({ ...props
      }) {
        props.role = "tooltip";
        return useTooltipIdProps(useMergedProps()({
          onPointerEnter,
          onPointerLeave
        }, props));
      }

      return {
        useTooltipProps
      };
    }, [useTooltipIdProps]);
    return {
      useTooltip,
      useTooltipTrigger,
      isOpen: open,
      getIsOpen: getOpen
    };
  }

  function useAriaRadioGroup({
    name,
    selectedValue,
    onInput
  }) {
    const {
      getElement: getRadioGroupParentElement,
      useRefElementProps
    } = useRefElement({});
    useStableGetter(name); //const getSelectedIndex = useCallback((selectedValue: V) => { return byName.current.get(selectedValue) ?? 0 }, [])

    const [selectedIndex, setSelectedIndex] = useState(0);
    const byName = useRef(new Map());
    const stableOnInput = useStableCallback(onInput);
    const [anyRadiosFocused, setAnyRadiosFocused, getAnyRadiosFocused] = useState(false);
    const {
      managedChildren,
      useListNavigationChild,
      setTabbableIndex,
      tabbableIndex,
      focusCurrent,
      currentTypeahead,
      invalidTypeahead
    } = useListNavigation({
      shouldFocusOnChange: getAnyRadiosFocused
    }); // Track whether the currently focused element is a child of the radio group parent element.
    // When it's not, we reset the tabbable index back to the currently selected element.

    useActiveElement({
      onActiveElementChange: activeElement => {
        var _getRadioGroupParentE;

        return setAnyRadiosFocused(!!((_getRadioGroupParentE = getRadioGroupParentElement()) !== null && _getRadioGroupParentE !== void 0 && _getRadioGroupParentE.contains(activeElement)));
      }
    });
    useEffect$1(() => {
      if (!anyRadiosFocused) setTabbableIndex(selectedIndex !== null && selectedIndex !== void 0 ? selectedIndex : 0);
    }, [anyRadiosFocused, selectedIndex, setTabbableIndex]);
    const useRadioGroupProps = useCallback(({ ...props
    }) => {
      props.role = "radiogroup";
      return useRefElementProps(props);
    }, [useRefElementProps]);
    let correctedIndex = selectedIndex == null || selectedIndex < 0 || selectedIndex >= managedChildren.length ? null : selectedIndex;
    useChildFlag({
      activatedIndex: correctedIndex,
      managedChildren,
      setChildFlag: (i, checked) => {
        var _managedChildren$i;

        return (_managedChildren$i = managedChildren[i]) === null || _managedChildren$i === void 0 ? void 0 : _managedChildren$i.setChecked(checked);
      },
      getChildFlag: i => {
        var _managedChildren$i$ge, _managedChildren$i2;

        return (_managedChildren$i$ge = (_managedChildren$i2 = managedChildren[i]) === null || _managedChildren$i2 === void 0 ? void 0 : _managedChildren$i2.getChecked()) !== null && _managedChildren$i$ge !== void 0 ? _managedChildren$i$ge : false;
      }
    });
    useEffect$1(() => {
      let selectedIndex = byName.current.get(selectedValue);
      setSelectedIndex(selectedIndex !== null && selectedIndex !== void 0 ? selectedIndex : null);
    }, [byName, selectedValue]);
    const useRadio = useCallback(function useAriaRadio({
      value,
      index,
      text,
      disabled,
      labelPosition,
      ...rest
    }) {
      const [checked, setChecked, getChecked] = useState(null);
      const onInput = useCallback(e => {
        stableOnInput(enhanceEvent(e, {
          selectedValue: value
        }));
      }, [stableOnInput, value, index]);
      const {
        getInputElement,
        getLabelElement,
        useCheckboxLikeInputElement,
        useCheckboxLikeLabelElement
      } = useCheckboxLike({
        checked: checked !== null && checked !== void 0 ? checked : false,
        disabled,
        labelPosition,
        onInput,
        role: "radio"
      });
      useLayoutEffect$1(() => {
        byName.current.set(value, index);
        return () => {
          byName.current.delete(value);
        };
      }, [byName, value, index]);
      const {
        tabbable,
        useListNavigationChildProps,
        useListNavigationSiblingProps
      } = useListNavigationChild({
        index,
        setChecked,
        getChecked,
        text,
        ...rest
      });

      const useRadioInput = ({
        tag
      }) => {
        const useRadioInputProps = props => {
          if (tag == "input") {
            props.name = name;
            props.checked = checked !== null && checked !== void 0 ? checked : false;
          } else {
            props["aria-checked"] = (checked !== null && checked !== void 0 ? checked : false).toString();
          }

          const {
            useCheckboxLikeInputElementProps
          } = useCheckboxLikeInputElement({
            tag
          });
          return useMergedProps()(useListNavigationChildProps(useCheckboxLikeInputElementProps({})), props);
        };

        return {
          useRadioInputProps
        };
      };

      const useRadioLabel = useCallback(({
        tag
      }) => {
        const useRadioLabelProps = props => {
          const {
            useCheckboxLikeLabelElementProps
          } = useCheckboxLikeLabelElement({
            tag
          });
          return useCheckboxLikeLabelElementProps(useMergedProps()({}, props));
        };

        return {
          useRadioLabelProps
        };
      }, [useCheckboxLikeLabelElement]);
      return {
        useRadioInput,
        useRadioLabel
      };
    }, [byName, useListNavigationChild]);
    return {
      useRadio,
      useRadioGroupProps,
      managedChildren,
      selectedIndex,
      tabbableIndex,
      focusRadio: focusCurrent,
      currentTypeahead,
      invalidTypeahead
    };
  }

  function useToasts({}) {
    // "Pointer" to whatever index toast is currently being shown.
    // E.g. it's 0 when the first toast is shown, then when dismissed, it becomes 1.
    // When the second toast is shown, it stays at 1 until dismissed, when it then becomes 2, etc.
    // Because toasts can potentially be dismissed out of order, this represents the "oldest" toast that still hasn't been dismissed,
    // even if "younger" ones have.
    const [activeToastIndex, setActiveToastIndex, getActiveToastIndex] = useState(-1);
    const [politeness, setPoliteness] = useState("polite");
    const {
      getElement,
      useRefElementProps
    } = useRefElement({});
    const {
      indicesByElement,
      managedChildren,
      mountedChildren: toastQueue,
      useManagedChild,
      getMountIndex
    } = useChildManager(); // Any time a new toast mounts, update our bottommostToastIndex to point to it if necessary
    // ("necessary" just meaning if it's the first toast ever or all prior toasts have been dismissed)

    const onAnyToastMounted = useCallback(index => {
      let bottom = getActiveToastIndex();

      while (bottom < toastQueue.length && (bottom < 0 || (_toastQueue$bottom = toastQueue[bottom]) !== null && _toastQueue$bottom !== void 0 && _toastQueue$bottom.dismissed)) {
        var _toastQueue$bottom;

        ++bottom;
      }

      setActiveToastIndex(bottom);
    }, [setActiveToastIndex]); // Any time a toast is dismissed, update our bottommostToastIndex to point to the next toast in the queue, if one exists.

    const onAnyToastDismissed = useCallback(index => {
      var _getElement, _toastQueue$bottom3;

      let bottom = getActiveToastIndex();

      while (bottom < toastQueue.length && (bottom < 0 || bottom === index || (_toastQueue$bottom2 = toastQueue[bottom]) !== null && _toastQueue$bottom2 !== void 0 && _toastQueue$bottom2.dismissed)) {
        var _toastQueue$bottom2;

        ++bottom;
      }

      setActiveToastIndex(bottom);
      if ((_getElement = getElement()) !== null && _getElement !== void 0 && _getElement.contains(document.activeElement)) (_toastQueue$bottom3 = toastQueue[bottom]) === null || _toastQueue$bottom3 === void 0 ? void 0 : _toastQueue$bottom3.focus();
    }, [setActiveToastIndex]); // Any time the index pointing to the currently-showing toast changes,
    // update the relevant children and let them know that they're now either active or dismissed.

    useChildFlag({
      activatedIndex: activeToastIndex,
      managedChildren: toastQueue,
      setChildFlag: (i, set) => {
        var _toastQueue$i;

        if (set) console.assert(i <= getActiveToastIndex());
        (_toastQueue$i = toastQueue[i]) === null || _toastQueue$i === void 0 ? void 0 : _toastQueue$i.setStatus(prev => prev === "dismissed" ? "dismissed" : set ? "active" : i < getActiveToastIndex() ? "dismissed" : "pending");
      },
      getChildFlag: i => {
        var _toastQueue$i2;

        return ((_toastQueue$i2 = toastQueue[i]) === null || _toastQueue$i2 === void 0 ? void 0 : _toastQueue$i2.getStatus()) === "active";
      }
    });
    const useToast = useCallback(({
      politeness,
      timeout
    }) => {
      const [status, setStatus, getStatus] = useState("pending");
      const dismissed = status === "dismissed";
      const dismiss = useCallback(() => {
        setStatus("dismissed");
      }, []);
      const {
        randomId: toastId
      } = useRandomId({
        prefix: "toast-"
      }); //const [toastId, setToastId] = useState(() => generateRandomId("toast-"));

      useLayoutEffect$1(() => {
        setPoliteness(politeness !== null && politeness !== void 0 ? politeness : "polite");
      }, [politeness]);
      const focus = useCallback(() => {
        const element = getElement();

        if (element) {
          const firstFocusable = findFirstFocusable(element);
          firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
        }
      }, []);
      const {
        element,
        useManagedChildProps,
        getElement
      } = useManagedChild({
        dismissed,
        index: toastId,
        setStatus,
        getStatus,
        focus
      });
      const isActive = status === "active";
      useEffect$1(() => {
        onAnyToastMounted(getMountIndex(toastId));
      }, []);
      useEffect$1(() => {
        if (dismissed) onAnyToastDismissed(getMountIndex(toastId));
      }, [dismissed]);
      useTimeout({
        timeout: timeout == null ? null : isFinite(timeout) ? timeout : timeout > 0 ? null : 0,
        callback: () => {
          if (isActive) setStatus("dismissed");
        },
        triggerIndex: isActive
      });
      return {
        status,
        getStatus,
        dismiss,
        useToastProps: function ({ ...props
        }) {
          return useMergedProps()(useManagedChildProps({}), props);
        }
      };
    }, []);

    function useToastContainerProps({
      role,
      "aria-live": ariaLive,
      "aria-relevant": ariaRelevant,
      ...props
    }) {
      var _ref;

      return useMergedProps()(useRefElementProps({
        class: "toasts-container",
        role: "status",
        "aria-live": (_ref = politeness !== null && politeness !== void 0 ? politeness : ariaLive) !== null && _ref !== void 0 ? _ref : "polite",
        "aria-relevant": ariaRelevant !== null && ariaRelevant !== void 0 ? ariaRelevant : "additions"
      }), props);
    }

    return {
      useToast,
      useToastContainerProps
    };
  }

  // so it can be used with, like, lists and junk too
  // but just getting to this point in the first place was *exhausting*.
  //
  // Please be aware of the special conditions between
  // thead, tbody, tfoot and their respective child rows
  // (namely each row MUST be a DIRECT descendant of its
  // corresponding table section, or at the very least,
  // must have a child that takes a rowIndex prop that
  // corresponds to its row amongst ALL children, even those
  // in a different table section)

  function useTable({}) {
    // This is the index of the currently sorted column('s header cell that was clicked to sort it).
    // This is used by all the header cells to know when to reset their "sort mode" back to its initial state.
    const [sortedColumn, setSortedColumn, getSortedColumn] = useState(null);
    const [sortedDirection, setSortedDirection, getSortedDirection] = useState(null);
    const {
      useManagedChild: useManagedHeaderCellChild,
      managedChildren: managedHeaderCells
    } = useChildManager(); // When we sort the table, we need to manually update each table component
    // A little bit ugly, but it gets the job done.

    const {
      useManagedChild: useManagedTableSection,
      managedChildren: managedTableSections
    } = useChildManager(); // Used for navigation to determine when focus should follow the selected cell

    const {
      useHasFocusProps,
      getFocusedInner
    } = useHasFocus({}); // These are used to keep track of a mapping between unsorted index <---> sorted index.
    // These are needed for navigation with the arrow keys.

    const mangleMap = useRef(new Map());
    const demangleMap = useRef(new Map());
    const indexMangler = useCallback(n => {
      var _mangleMap$current$ge;

      return (_mangleMap$current$ge = mangleMap.current.get(n)) !== null && _mangleMap$current$ge !== void 0 ? _mangleMap$current$ge : n;
    }, []);
    const indexDemangler = useCallback(n => {
      var _demangleMap$current$;

      return (_demangleMap$current$ = demangleMap.current.get(n)) !== null && _demangleMap$current$ !== void 0 ? _demangleMap$current$ : n;
    }, []); // Only used by the sorting function, nothing else

    const [bodyRowsGetter, setBodyRowsGetter, getBodyRowsGetter] = useState(null); // The actual sort function.
    // Note that it DOES look at header and footer cells, but just tiptoes around them.

    const sort = useCallback((column, direction) => {
      var _managedTableSections, _managedTableSections2, _managedTableSections3;

      const managedRows = getBodyRowsGetter()();
      let sortedRows = managedRows.slice().sort((lhsRow, rhsRow) => {
        var _lhsRow$getManagedCel, _lhsRow$getManagedCel2, _rhsRow$getManagedCel, _rhsRow$getManagedCel2;

        console.assert(lhsRow.location === rhsRow.location && lhsRow.location === "body");
        let result = compare((_lhsRow$getManagedCel = lhsRow.getManagedCells()) === null || _lhsRow$getManagedCel === void 0 ? void 0 : (_lhsRow$getManagedCel2 = _lhsRow$getManagedCel[column]) === null || _lhsRow$getManagedCel2 === void 0 ? void 0 : _lhsRow$getManagedCel2.value, (_rhsRow$getManagedCel = rhsRow.getManagedCells()) === null || _rhsRow$getManagedCel === void 0 ? void 0 : (_rhsRow$getManagedCel2 = _rhsRow$getManagedCel[column]) === null || _rhsRow$getManagedCel2 === void 0 ? void 0 : _rhsRow$getManagedCel2.value);
        if (direction[0] == "d") return -result;
        return result;
      }); // Update our sorted <--> unsorted indices map 
      // and rerender the whole table, basically

      for (let indexAsSorted = 0; indexAsSorted < sortedRows.length; ++indexAsSorted) {
        const indexAsUnsorted = sortedRows[indexAsSorted].index;
        managedRows[indexAsSorted].setRowIndexAsSorted(indexAsUnsorted);
        mangleMap.current.set(indexAsSorted, indexAsUnsorted);
        demangleMap.current.set(indexAsUnsorted, indexAsSorted);
      }

      setSortedColumn(column);
      setSortedDirection(direction);
      (_managedTableSections = managedTableSections["head"]) === null || _managedTableSections === void 0 ? void 0 : _managedTableSections.forceUpdate();
      (_managedTableSections2 = managedTableSections["body"]) === null || _managedTableSections2 === void 0 ? void 0 : _managedTableSections2.forceUpdate();
      (_managedTableSections3 = managedTableSections["foot"]) === null || _managedTableSections3 === void 0 ? void 0 : _managedTableSections3.forceUpdate();
    }, [
      /* Must remain stable */
    ]);
    const useTableSection = useCallback(({
      location
    }) => {
      // Used to track if we tried to render any rows before they've been
      // given their "true" index to display (their sorted index).
      // This is true for all rows initially on mount, but especially true
      // when the table has been pre-sorted and then a new row is
      // added on top of that afterwards. 
      const [hasUnsortedRows, setHasUnsortedRows] = useState(false);
      const {
        element,
        useManagedChildProps
      } = useManagedTableSection({
        index: location,
        forceUpdate: useForceUpdate()
      });
      const useTableSectionProps = useCallback(({
        children,
        ...props
      }) => {
        return useManagedChildProps(useMergedProps()({
          role: "rowgroup",
          children: location !== "body" ? children : // For rows in the body, sort them by the criteria we set
          // the last the the sort function ran and set our mangle maps.
          children.slice().sort((lhs, rhs) => {
            var _demangleMap$current$2, _demangleMap$current$3;

            return ((_demangleMap$current$2 = demangleMap.current.get(lhs.props.rowIndex)) !== null && _demangleMap$current$2 !== void 0 ? _demangleMap$current$2 : lhs.props.rowIndex) - ((_demangleMap$current$3 = demangleMap.current.get(rhs.props.rowIndex)) !== null && _demangleMap$current$3 !== void 0 ? _demangleMap$current$3 : rhs.props.rowIndex);
          }).map(child => createElement(child.type, { ...child.props,
            key: child.props.rowIndex
          }))
        }, props));
      }, [useManagedChildProps]);
      useEffect$1(() => {
        if (hasUnsortedRows) {
          var _getSortedColumn, _getSortedDirection;

          sort((_getSortedColumn = getSortedColumn()) !== null && _getSortedColumn !== void 0 ? _getSortedColumn : 0, (_getSortedDirection = getSortedDirection()) !== null && _getSortedDirection !== void 0 ? _getSortedDirection : "ascending");
          setHasUnsortedRows(false);
        }
      }, [hasUnsortedRows]); // Actually implement grid navigation

      const {
        cellIndex,
        rowIndex,
        rowCount,
        useGridNavigationRow,
        managedRows
      } = useGridNavigation({
        shouldFocusOnChange: getFocusedInner,
        indexMangler,
        indexDemangler
      });
      useEffect$1(() => {
        if (location === "body") setBodyRowsGetter(prev => () => managedRows);
      }, [location, managedRows]);
      /**
       *
       * IMPORTANT NOTE ABOUT COMPONENTS USING THIS HOOK!!
       *
       * The rowIndex prop that you pass to your custom TableRow component
       * *must* be named "rowIndex" and *must* be, e.g., 0 for the header
       * row, 1 for the first body row, etc.
       *
       * Your custom TableRow component must also be the *direct*
       * child of whatever implements your TableHead, TableBody, and
       * TableFoot components.
       *
       */

      const useTableRow = useCallback(({
        rowIndex: rowIndexAsUnsorted,
        location,
        hidden
      }) => {
        // This is used by the sort function to update this row when everything's shuffled.
        const [rowIndexAsSorted, setRowIndexAsSorted, getRowIndexAsSorted] = useState(null);
        const getManagedCells = useStableCallback(() => managedCells);
        const {
          useGridNavigationCell,
          useGridNavigationRowProps,
          cellCount,
          isTabbableRow,
          managedCells
        } = useGridNavigationRow({
          index: rowIndexAsUnsorted,
          getManagedCells,
          hidden,
          ...{
            rowIndexAsSorted: getRowIndexAsSorted()
          },
          getRowIndexAsSorted,
          setRowIndexAsSorted,
          location
        }); // Not public -- just the shared code between header cells and body cells

        const useTableCellShared = useCallback(({
          columnIndex,
          value
        }) => {
          const {
            useGridNavigationCellProps
          } = useGridNavigationCell({
            index: columnIndex,
            value
          });

          function useTableCellProps({
            role,
            ...props
          }) {
            return useMergedProps()({
              role: "gridcell"
            }, props);
          }

          function useTableCellDelegateProps({
            role,
            ...props
          }) {
            return useGridNavigationCellProps(props);
          }

          return {
            useTableCellProps,
            useTableCellDelegateProps
          };
        }, []);
        const useTableHeadCell = useCallback(({
          columnIndex,
          unsortable,
          tag
        }) => {
          const {
            useTableCellDelegateProps,
            useTableCellProps
          } = useTableCellShared({
            columnIndex,
            value: ""
          }); // This is mostly all just in regards to
          // handling the "sort-on-click" interaction.

          const [sortDirection, setSortDirection, getSortDirection] = useState(null);
          const [isTheSortedColumn, setIsTheSortedColumn] = useState(false);
          const random = useRef(generateRandomId());
          const {
            element,
            getElement,
            useManagedChildProps
          } = useManagedHeaderCellChild({
            index: random.current,
            setSortedColumn: useCallback(c => {
              setIsTheSortedColumn(c === columnIndex);
            }, [columnIndex])
          });
          useEffect$1(() => {
            if (!isTheSortedColumn) setSortDirection(null);
          }, [isTheSortedColumn]);
          const onSortClick = useCallback(() => {
            let nextSortDirection = getSortDirection();
            if (nextSortDirection === "ascending") nextSortDirection = "descending";else nextSortDirection = "ascending";
            setSortDirection(nextSortDirection);
            sort(columnIndex, nextSortDirection);
          }, []);

          const useTableHeadCellProps = props => {
            const m = useTableCellProps(useButtonLikeEventHandlers(unsortable ? null : onSortClick, undefined)(useMergedProps()({
              role: "columnheader"
            }, props)));
            return useManagedChildProps(m);
          };

          return {
            useTableHeadCellProps,
            useTableHeadCellDelegateProps: useTableCellDelegateProps,
            sortDirection
          };
        }, []);
        const useTableCell = useCallback(({
          columnIndex,
          value
        }) => {
          const {
            useTableCellDelegateProps,
            useTableCellProps
          } = useTableCellShared({
            columnIndex,
            value
          });
          return {
            useTableCellProps,
            useTableCellDelegateProps
          };
        }, []);

        function useTableRowProps({
          role,
          ...props
        }) {
          return useGridNavigationRowProps(useMergedProps()({
            role: "row"
          }, props));
        }

        return {
          useTableCell,
          useTableRowProps,
          useTableHeadCell,
          rowIndexAsSorted,
          rowIndexAsUnsorted
        };
      }, []);
      return {
        useTableSectionProps,
        useTableRow
      };
    }, []); // Whenever any given header cell requests a sort, it sets itself here, in the table,
    // as the "sortedColumn" column.  We then, as the parent table, let all the other
    // header rows know who is the "sortedColumn" column so that they can un-style themselves.

    useEffect$1(() => {
      if (sortedColumn != null) {
        Object.entries(managedHeaderCells).forEach(([index, cell]) => {
          cell.setSortedColumn(sortedColumn);
        });
      }
    }, [sortedColumn]); // Tables need a role of "grid" in order to be considered 
    // "interactive content" like a text box that passes through
    // keyboard inputs.

    function useTableProps({
      role,
      ...props
    }) {
      return useHasFocusProps(useMergedProps()({
        role: "grid"
      }, props));
    }

    return {
      useTableProps,
      useTableSection,
      managedTableSections
    };
  }

  function compare(lhs, rhs) {
    return compare1(lhs, rhs);

    function compare3(lhs, rhs) {
      // Coerce strings to numbers if they seem to stay the same when serialized
      if (`${+lhs}` === lhs) lhs = +lhs;
      if (`${+rhs}` === rhs) rhs = +rhs; // At this point, if either argument is a string, turn the other one into one too

      if (typeof lhs === "string") rhs = `${rhs}`;
      if (typeof rhs === "string") lhs = `${lhs}`;
      console.assert(typeof lhs === typeof rhs);
      if (typeof lhs === "string") return lhs.localeCompare(rhs);
      if (typeof lhs === "number") return +lhs - +rhs;
      return 0;
    }

    function compare2(lhs, rhs) {
      if (typeof lhs === "boolean" || lhs instanceof Date) lhs = +lhs;
      if (typeof rhs === "boolean" || rhs instanceof Date) rhs = +rhs;
      return compare3(lhs, rhs);
    }

    function compare1(lhs, rhs) {
      if (lhs == null && rhs == null) {
        // They're both null
        return 0;
      } else if (lhs == null || rhs == null) {
        // One of the two is null -- easy case
        return lhs != null ? 1 : -1;
      }

      return compare2(lhs, rhs);
    }
  }

  /**
   * Assign properties from `props` to `obj`
   * @template O, P The obj and props types
   * @param {O} obj The object to copy properties to
   * @param {P} props The object to copy properties from
   * @returns {O & P}
   */

  function assign(obj, props) {
    for (var i in props) {
      obj[i] = props[i];
    }

    return (
      /** @type {O & P} */
      obj
    );
  }
  /**
   * Check if two objects have a different shape
   * @param {object} a
   * @param {object} b
   * @returns {boolean}
   */


  function shallowDiffers(a, b) {
    for (var i in a) {
      if (i !== '__source' && !(i in b)) {
        return true;
      }
    }

    for (var _i in b) {
      if (_i !== '__source' && a[_i] !== b[_i]) {
        return true;
      }
    }

    return false;
  }
  /**
   * Component class with a predefined `shouldComponentUpdate` implementation
   */


  function PureComponent(p) {
    this.props = p;
  }

  PureComponent.prototype = new Component$1(); // Some third-party libraries check if this property is present

  PureComponent.prototype.isPureReactComponent = true;

  PureComponent.prototype.shouldComponentUpdate = function (props, state) {
    return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
  };
  /**
   * Memoize a component, so that it only updates when the props actually have
   * changed. This was previously known as `React.pure`.
   * @param {import('./internal').FunctionComponent} c functional component
   * @param {(prev: object, next: object) => boolean} [comparer] Custom equality function
   * @returns {import('./internal').FunctionComponent}
   */


  function memo(c, comparer) {
    function shouldUpdate(nextProps) {
      var ref = this.props.ref;
      var updateRef = ref == nextProps.ref;

      if (!updateRef && ref) {
        ref.call ? ref(null) : ref.current = null;
      }

      if (!comparer) {
        return shallowDiffers(this.props, nextProps);
      }

      return !comparer(this.props, nextProps) || !updateRef;
    }

    function Memoed(props) {
      this.shouldComponentUpdate = shouldUpdate;
      return createElement(c, props);
    }

    Memoed.displayName = 'Memo(' + (c.displayName || c.name) + ')';
    Memoed.prototype.isReactComponent = true;
    Memoed._forwarded = true;
    return Memoed;
  }

  var oldDiffHook = options._diff;

  options._diff = function (vnode) {
    if (vnode.type && vnode.type._forwarded && vnode.ref) {
      vnode.props.ref = vnode.ref;
      vnode.ref = null;
    }

    if (oldDiffHook) {
      oldDiffHook(vnode);
    }
  };

  var REACT_FORWARD_SYMBOL = typeof Symbol != 'undefined' && Symbol.for && Symbol.for('react.forward_ref') || 0xf47;
  /**
   * Pass ref down to a child. This is mainly used in libraries with HOCs that
   * wrap components. Using `forwardRef` there is an easy way to get a reference
   * of the wrapped component instead of one of the wrapper itself.
   * @param {import('./index').ForwardFn} fn
   * @returns {import('./internal').FunctionComponent}
   */

  function forwardRef(fn) {
    var FName = fn.name || "Forwarded"; // We always have ref in props.ref, except for
    // mobx-react. It will call this function directly
    // and always pass ref as the second argument.

    var Forwarded = namedFunction(FName, function () {
      return function (props, ref) {
        var clone = assign({}, props);
        delete clone.ref;
        ref = props.ref || ref;
        return fn(clone, !ref || typeof ref === 'object' && !('current' in ref) ? null : ref);
      };
    }); // mobx-react checks for this being present

    Forwarded.$$typeof = REACT_FORWARD_SYMBOL; // mobx-react heavily relies on implementation details.
    // It expects an object here with a `render` property,
    // and prototype.render will fail. Without this
    // mobx-react throws.

    Forwarded.render = Forwarded;
    Forwarded.prototype.isReactComponent = Forwarded._forwarded = true;
    Forwarded.displayName = 'ForwardRef(' + (fn.displayName || fn.name) + ')';
    return Forwarded;
  }
  var oldCatchError = options._catchError;

  options._catchError = function (error, newVNode, oldVNode) {
    if (error.then) {
      /** @type {import('./internal').Component} */
      var component;
      var vnode = newVNode;

      for (; vnode = vnode._parent;) {
        if ((component = vnode._component) && component._childDidSuspend) {
          if (newVNode._dom == null) {
            newVNode._dom = oldVNode._dom;
            newVNode._children = oldVNode._children;
          } // Don't call oldCatchError if we found a Suspense


          return component._childDidSuspend(error, newVNode);
        }
      }
    }

    oldCatchError(error, newVNode, oldVNode);
  };

  var oldUnmount = options.unmount;

  options.unmount = function (vnode) {
    /** @type {import('./internal').Component} */
    var component = vnode._component;

    if (component && component._onResolve) {
      component._onResolve();
    } // if the component is still hydrating
    // most likely it is because the component is suspended
    // we set the vnode.type as `null` so that it is not a typeof function
    // so the unmount will remove the vnode._dom


    if (component && vnode._hydrating === true) {
      vnode.type = null;
    }

    if (oldUnmount) {
      oldUnmount(vnode);
    }
  };

  function detachedClone(vnode, detachedParent, parentDom) {
    if (vnode) {
      if (vnode._component && vnode._component.__hooks) {
        vnode._component.__hooks._list.forEach(function (effect) {
          if (typeof effect._cleanup == 'function') {
            effect._cleanup();
          }
        });

        vnode._component.__hooks = null;
      }

      vnode = assign({}, vnode);

      if (vnode._component != null) {
        if (vnode._component._parentDom === parentDom) {
          vnode._component._parentDom = detachedParent;
        }

        vnode._component = null;
      }

      vnode._children = vnode._children && vnode._children.map(function (child) {
        return detachedClone(child, detachedParent, parentDom);
      });
    }

    return vnode;
  }

  function removeOriginal(vnode, detachedParent, originalParent) {
    if (vnode) {
      vnode._original = null;
      vnode._children = vnode._children && vnode._children.map(function (child) {
        return removeOriginal(child, detachedParent, originalParent);
      });

      if (vnode._component) {
        if (vnode._component._parentDom === detachedParent) {
          if (vnode._dom) {
            originalParent.insertBefore(vnode._dom, vnode._nextDom);
          }

          vnode._component._force = true;
          vnode._component._parentDom = originalParent;
        }
      }
    }

    return vnode;
  } // having custom inheritance instead of a class here saves a lot of bytes


  function Suspense() {
    // we do not call super here to golf some bytes...
    this._pendingSuspensionCount = 0;
    this._suspenders = null;
    this._detachOnNextRender = null;
  } // Things we do here to save some bytes but are not proper JS inheritance:
  // - call `new Component()` as the prototype
  // - do not set `Suspense.prototype.constructor` to `Suspense`


  Suspense.prototype = new Component$1();
  /**
   * @this {import('./internal').SuspenseComponent}
   * @param {Promise} promise The thrown promise
   * @param {import('./internal').VNode<any, any>} suspendingVNode The suspending component
   */

  Suspense.prototype._childDidSuspend = function (promise, suspendingVNode) {
    var suspendingComponent = suspendingVNode._component;
    /** @type {import('./internal').SuspenseComponent} */

    var c = this;

    if (c._suspenders == null) {
      c._suspenders = [];
    }

    c._suspenders.push(suspendingComponent);

    var resolve = suspended(c._vnode);
    var resolved = false;

    var onResolved = function onResolved() {
      if (resolved) {
        return;
      }

      resolved = true;
      suspendingComponent._onResolve = null;

      if (resolve) {
        resolve(onSuspensionComplete);
      } else {
        onSuspensionComplete();
      }
    };

    suspendingComponent._onResolve = onResolved;

    var onSuspensionComplete = function onSuspensionComplete() {
      if (! --c._pendingSuspensionCount) {
        // If the suspension was during hydration we don't need to restore the
        // suspended children into the _children array
        if (c.state._suspended) {
          var suspendedVNode = c.state._suspended;
          c._vnode._children[0] = removeOriginal(suspendedVNode, suspendedVNode._component._parentDom, suspendedVNode._component._originalParentDom);
        }

        c.setState({
          _suspended: c._detachOnNextRender = null
        });

        var _suspended;

        while (_suspended = c._suspenders.pop()) {
          _suspended.forceUpdate();
        }
      }
    };
    /**
     * We do not set `suspended: true` during hydration because we want the actual markup
     * to remain on screen and hydrate it when the suspense actually gets resolved.
     * While in non-hydration cases the usual fallback -> component flow would occour.
     */


    var wasHydrating = suspendingVNode._hydrating === true;

    if (!c._pendingSuspensionCount++ && !wasHydrating) {
      c.setState({
        _suspended: c._detachOnNextRender = c._vnode._children[0]
      });
    }

    promise.then(onResolved, onResolved);
  };

  Suspense.prototype.componentWillUnmount = function () {
    this._suspenders = [];
  };
  /**
   * @this {import('./internal').SuspenseComponent}
   * @param {import('./internal').SuspenseComponent["props"]} props
   * @param {import('./internal').SuspenseState} state
   */


  Suspense.prototype.render = function (props, state) {
    if (this._detachOnNextRender) {
      // When the Suspense's _vnode was created by a call to createVNode
      // (i.e. due to a setState further up in the tree)
      // it's _children prop is null, in this case we "forget" about the parked vnodes to detach
      if (this._vnode._children) {
        var detachedParent = document.createElement('div');
        var detachedComponent = this._vnode._children[0]._component;
        this._vnode._children[0] = detachedClone(this._detachOnNextRender, detachedParent, detachedComponent._originalParentDom = detachedComponent._parentDom);
      }

      this._detachOnNextRender = null;
    } // Wrap fallback tree in a VNode that prevents itself from being marked as aborting mid-hydration:

    /** @type {import('./internal').VNode} */


    var fallback = state._suspended && createElement(Fragment, null, props.fallback);

    if (fallback) {
      fallback._hydrating = null;
    }

    return [createElement(Fragment, null, state._suspended ? null : props.children), fallback];
  };
  /**
   * Checks and calls the parent component's _suspended method, passing in the
   * suspended vnode. This is a way for a parent (e.g. SuspenseList) to get notified
   * that one of its children/descendants suspended.
   *
   * The parent MAY return a callback. The callback will get called when the
   * suspension resolves, notifying the parent of the fact.
   * Moreover, the callback gets function `unsuspend` as a parameter. The resolved
   * child descendant will not actually get unsuspended until `unsuspend` gets called.
   * This is a way for the parent to delay unsuspending.
   *
   * If the parent does not return a callback then the resolved vnode
   * gets unsuspended immediately when it resolves.
   *
   * @param {import('./internal').VNode} vnode
   * @returns {((unsuspend: () => void) => void)?}
   */


  function suspended(vnode) {
    /** @type {import('./internal').Component} */
    var component = vnode._parent._component;
    return component && component._suspended && component._suspended(vnode);
  }

  var SUSPENDED_COUNT = 0;
  var RESOLVED_COUNT = 1;
  var NEXT_NODE = 2; // Having custom inheritance instead of a class here saves a lot of bytes.

  function SuspenseList() {
    this._next = null;
    this._map = null;
  } // Mark one of child's earlier suspensions as resolved.
  // Some pending callbacks may become callable due to this
  // (e.g. the last suspended descendant gets resolved when
  // revealOrder === 'together'). Process those callbacks as well.


  var resolve = function resolve(list, child, node) {
    if (++node[RESOLVED_COUNT] === node[SUSPENDED_COUNT]) {
      // The number a child (or any of its descendants) has been suspended
      // matches the number of times it's been resolved. Therefore we
      // mark the child as completely resolved by deleting it from ._map.
      // This is used to figure out when *all* children have been completely
      // resolved when revealOrder is 'together'.
      list._map.delete(child);
    } // If revealOrder is falsy then we can do an early exit, as the
    // callbacks won't get queued in the node anyway.
    // If revealOrder is 'together' then also do an early exit
    // if all suspended descendants have not yet been resolved.


    if (!list.props.revealOrder || list.props.revealOrder[0] === 't' && list._map.size) {
      return;
    } // Walk the currently suspended children in order, calling their
    // stored callbacks on the way. Stop if we encounter a child that
    // has not been completely resolved yet.


    node = list._next;

    while (node) {
      while (node.length > 3) {
        node.pop()();
      }

      if (node[RESOLVED_COUNT] < node[SUSPENDED_COUNT]) {
        break;
      }

      list._next = node = node[NEXT_NODE];
    }
  }; // Things we do here to save some bytes but are not proper JS inheritance:
  // - call `new Component()` as the prototype
  // - do not set `Suspense.prototype.constructor` to `Suspense`


  SuspenseList.prototype = new Component$1();

  SuspenseList.prototype._suspended = function (child) {
    var list = this;
    var delegated = suspended(list._vnode);

    var node = list._map.get(child);

    node[SUSPENDED_COUNT]++;
    return function (unsuspend) {
      var wrappedUnsuspend = function wrappedUnsuspend() {
        if (!list.props.revealOrder) {
          // Special case the undefined (falsy) revealOrder, as there
          // is no need to coordinate a specific order or unsuspends.
          unsuspend();
        } else {
          node.push(unsuspend);
          resolve(list, child, node);
        }
      };

      if (delegated) {
        delegated(wrappedUnsuspend);
      } else {
        wrappedUnsuspend();
      }
    };
  };

  SuspenseList.prototype.render = function (props) {
    this._next = null;
    this._map = new Map();
    var children = toChildArray(props.children);

    if (props.revealOrder && props.revealOrder[0] === 'b') {
      // If order === 'backwards' (or, well, anything starting with a 'b')
      // then flip the child list around so that the last child will be
      // the first in the linked list.
      children.reverse();
    } // Build the linked list. Iterate through the children in reverse order
    // so that `_next` points to the first linked list node to be resolved.


    for (var i = children.length; i--;) {
      // Create a new linked list node as an array of form:
      // 	[suspended_count, resolved_count, next_node]
      // where suspended_count and resolved_count are numeric counters for
      // keeping track how many times a node has been suspended and resolved.
      //
      // Note that suspended_count starts from 1 instead of 0, so we can block
      // processing callbacks until componentDidMount has been called. In a sense
      // node is suspended at least until componentDidMount gets called!
      //
      // Pending callbacks are added to the end of the node:
      // 	[suspended_count, resolved_count, next_node, callback_0, callback_1, ...]
      this._map.set(children[i], this._next = [1, 0, this._next]);
    }

    return props.children;
  };

  SuspenseList.prototype.componentDidUpdate = SuspenseList.prototype.componentDidMount = function () {
    var _this = this; // Iterate through all children after mounting for two reasons:
    // 1. As each node[SUSPENDED_COUNT] starts from 1, this iteration increases
    //    each node[RELEASED_COUNT] by 1, therefore balancing the counters.
    //    The nodes can now be completely consumed from the linked list.
    // 2. Handle nodes that might have gotten resolved between render and
    //    componentDidMount.


    this._map.forEach(function (node, child) {
      resolve(_this, child, node);
    });
  };
  /**
   * @param {import('../../src/index').RenderableProps<{ context: any }>} props
   */


  function ContextProvider(props) {
    this.getChildContext = function () {
      return props.context;
    };

    return props.children;
  }
  /**
   * Portal component
   * @this {import('./internal').Component}
   * @param {object | null | undefined} props
   *
   * TODO: use createRoot() instead of fake root
   */


  function Portal(props) {
    var _this = this;

    var container = props._container;

    _this.componentWillUnmount = function () {
      render(null, _this._temp);
      _this._temp = null;
      _this._container = null;
    }; // When we change container we should clear our old container and
    // indicate a new mount.


    if (_this._container && _this._container !== container) {
      _this.componentWillUnmount();
    } // When props.vnode is undefined/false/null we are dealing with some kind of
    // conditional vnode. This should not trigger a render.


    if (props._vnode) {
      if (!_this._temp) {
        _this._container = container; // Create a fake DOM parent node that manages a subset of `container`'s children:

        _this._temp = {
          nodeType: 1,
          parentNode: container,
          childNodes: [],
          appendChild: function appendChild(child) {
            this.childNodes.push(child);

            _this._container.appendChild(child);
          },
          insertBefore: function insertBefore(child, before) {
            this.childNodes.push(child);

            _this._container.appendChild(child);
          },
          removeChild: function removeChild(child) {
            this.childNodes.splice(this.childNodes.indexOf(child) >>> 1, 1);

            _this._container.removeChild(child);
          }
        };
      } // Render our wrapping element into temp.


      render(createElement(ContextProvider, {
        context: _this.context
      }, props._vnode), _this._temp);
    } // When we come from a conditional render, on a mounted
    // portal we should clear the DOM.
    else if (_this._temp) {
      _this.componentWillUnmount();
    }
  }
  /**
   * Create a `Portal` to continue rendering the vnode tree at a different DOM node
   * @param {import('./internal').VNode} vnode The vnode to render
   * @param {import('./internal').PreactElement} container The DOM node to continue rendering in to.
   */


  function createPortal(vnode, container) {
    return createElement(Portal, {
      _vnode: vnode,
      _container: container
    });
  }

  var REACT_ELEMENT_TYPE = typeof Symbol != 'undefined' && Symbol.for && Symbol.for('react.element') || 0xeac7;
  var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
  var IS_DOM = typeof document !== 'undefined'; // Input types for which onchange should not be converted to oninput.
  // type="file|checkbox|radio", plus "range" in IE11.
  // (IE11 doesn't support Symbol, which we use here to turn `rad` into `ra` which matches "range")

  var onChangeInputType = function onChangeInputType(type) {
    return (typeof Symbol != 'undefined' && typeof Symbol() == 'symbol' ? /fil|che|rad/i : /fil|che|ra/i).test(type);
  }; // Some libraries like `react-virtualized` explicitly check for this.


  Component$1.prototype.isReactComponent = {}; // `UNSAFE_*` lifecycle hooks
  // Preact only ever invokes the unprefixed methods.
  // Here we provide a base "fallback" implementation that calls any defined UNSAFE_ prefixed method.
  // - If a component defines its own `componentDidMount()` (including via defineProperty), use that.
  // - If a component defines `UNSAFE_componentDidMount()`, `componentDidMount` is the alias getter/setter.
  // - If anything assigns to an `UNSAFE_*` property, the assignment is forwarded to the unprefixed property.
  // See https://github.com/preactjs/preact/issues/1941

  ['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate'].forEach(function (key) {
    Object.defineProperty(Component$1.prototype, key, {
      configurable: true,
      get: function get() {
        return this['UNSAFE_' + key];
      },
      set: function set(v) {
        Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          value: v
        });
      }
    });
  });

  var oldEventHook = options.event;

  options.event = function (e) {
    if (oldEventHook) {
      e = oldEventHook(e);
    }

    e.persist = empty;
    e.isPropagationStopped = isPropagationStopped;
    e.isDefaultPrevented = isDefaultPrevented;
    return e.nativeEvent = e;
  };

  function empty() {}

  function isPropagationStopped() {
    return this.cancelBubble;
  }

  function isDefaultPrevented() {
    return this.defaultPrevented;
  }

  var classNameDescriptor = {
    configurable: true,
    get: function get() {
      return this.class;
    }
  };
  var oldVNodeHook = options.vnode;

  options.vnode = function (vnode) {
    var type = vnode.type;
    var props = vnode.props;
    var normalizedProps = props; // only normalize props on Element nodes

    if (typeof type === 'string') {
      var nonCustomElement = type.indexOf('-') === -1;
      normalizedProps = {};

      for (var i in props) {
        var value = props[i];

        if (IS_DOM && i === 'children' && type === 'noscript') {
          // Emulate React's behavior of not rendering the contents of noscript tags on the client.
          continue;
        } else if (i === 'value' && 'defaultValue' in props && value == null) {
          // Skip applying value if it is null/undefined and we already set
          // a default value
          continue;
        } else if (i === 'defaultValue' && 'value' in props && props.value == null) {
          // `defaultValue` is treated as a fallback `value` when a value prop is present but null/undefined.
          // `defaultValue` for Elements with no value prop is the same as the DOM defaultValue property.
          i = 'value';
        } else if (i === 'download' && value === true) {
          // Calling `setAttribute` with a truthy value will lead to it being
          // passed as a stringified value, e.g. `download="true"`. React
          // converts it to an empty string instead, otherwise the attribute
          // value will be used as the file name and the file will be called
          // "true" upon downloading it.
          value = '';
        } else if (/ondoubleclick/i.test(i)) {
          i = 'ondblclick';
        } else if (/^onchange(textarea|input)/i.test(i + type) && !onChangeInputType(props.type)) {
          i = 'oninput';
        } else if (/^on(Ani|Tra|Tou|BeforeInp)/.test(i)) {
          i = i.toLowerCase();
        } else if (nonCustomElement && CAMEL_PROPS.test(i)) {
          i = i.replace(/[A-Z0-9]/, '-$&').toLowerCase();
        } else if (value === null) {
          value = undefined;
        }

        normalizedProps[i] = value;
      } // Add support for array select values: <select multiple value={[]} />


      if (type == 'select' && normalizedProps.multiple && Array.isArray(normalizedProps.value)) {
        // forEach() always returns undefined, which we abuse here to unset the value prop.
        normalizedProps.value = toChildArray(props.children).forEach(function (child) {
          child.props.selected = normalizedProps.value.indexOf(child.props.value) != -1;
        });
      } // Adding support for defaultValue in select tag


      if (type == 'select' && normalizedProps.defaultValue != null) {
        normalizedProps.value = toChildArray(props.children).forEach(function (child) {
          if (normalizedProps.multiple) {
            child.props.selected = normalizedProps.defaultValue.indexOf(child.props.value) != -1;
          } else {
            child.props.selected = normalizedProps.defaultValue == child.props.value;
          }
        });
      }

      vnode.props = normalizedProps;
    }

    if (type && props.class != props.className) {
      classNameDescriptor.enumerable = 'className' in props;

      if (props.className != null) {
        normalizedProps.class = props.className;
      }

      Object.defineProperty(normalizedProps, 'className', classNameDescriptor);
    }

    vnode.$$typeof = REACT_ELEMENT_TYPE;

    if (oldVNodeHook) {
      oldVNodeHook(vnode);
    }
  }; // Only needed for react-relay
  var oldBeforeRender = options._render;

  options._render = function (vnode) {
    if (oldBeforeRender) {
      oldBeforeRender(vnode);
    }
  }; // This is a very very private internal function for React it

  /**
   * Shortcut for preact/compat's `forwardRef` that auto-assumes some things that are useful for forwarding refs to `HTMLElements` specifically.
   * Namely it involves de-gunking the type system by letting us return *generic* function and playing nice with React. In all other respects, it acts like `forwardRef`.
   */

  function forwardElementRef$1(Component) {
    const ForwardedComponent = forwardRef(Component);
    return ForwardedComponent;
  }

  function getClassName(classBase, show, phase) {
    if (phase) return `${classBase || "transition"}-${show}-${phase}`;else return `${classBase || "transition"}-${show}`;
  }

  function forceReflow(e) {
    // Try really hard to make sure this isn't optimized out by anything.
    // We need it for its document reflow side effect.
    e.getBoundingClientRect();
    return e;
  }
  /**
   * A hook that adds & removes class names in a way that facilitates proper transitions.
   *
   * The first argument contains the props related directly to the transition.
   *
   * The second argument contains any other props you might want merged into the final product (these are not read or manipulated or anything -- it's purely shorthand and can be omitted with `{}` and then your own `useMergedProps`).
   */


  function useCreateTransitionableProps({
    measure,
    animateOnMount,
    classBase,
    onTransitionUpdate,
    exitVisibility,
    duration,
    show,
    ref
  }, otherProps) {
    var _classBase;

    (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
    const {
      getElement,
      useRefElementProps
    } = useRefElement({});
    const [phase, setPhase] = useState$1(animateOnMount ? "init" : null);
    const [direction, setDirection] = useState$1(show == null ? null : show ? "enter" : "exit");
    const [surfaceWidth, setSurfaceWidth] = useState$1(null);
    const [surfaceHeight, setSurfaceHeight] = useState$1(null);
    const [surfaceX, setSurfaceX] = useState$1(null);
    const [surfaceY, setSurfaceY] = useState$1(null);
    const [transitioningWidth, setTransitioningWidth] = useState$1(null);
    const [transitioningHeight, setTransitioningHeight] = useState$1(null);
    const [transitioningX, setTransitioningX] = useState$1(null);
    const [transitioningY, setTransitioningY] = useState$1(null);
    const [logicalDirectionInfo, setLogicalDirectionInfo] = useState$1(null);
    const {
      getLogicalDirectionInfo,
      useLogicalDirectionProps
    } = useLogicalDirection({
      onLogicalDirectionChange: setLogicalDirectionInfo
    });
    const onTransitionUpdateRef = useRef(onTransitionUpdate);
    const phaseRef = useRef(phase);
    const directionRef = useRef(direction);
    const durationRef = useRef(duration);
    const tooEarlyTimeoutRef = useRef(null);
    const tooEarlyValueRef = useRef(true);
    const tooLateTimeoutRef = useRef(null);
    const onTransitionEnd = useCallback(e => {
      if (e.target === getElement() && tooEarlyValueRef.current == false) {
        setPhase("finalize");
      }
    }, []);
    useLayoutEffect$1(() => {
      onTransitionUpdateRef.current = onTransitionUpdate;
    }, [onTransitionUpdate]);
    useLayoutEffect$1(() => {
      phaseRef.current = phase;
    }, [phase]);
    useLayoutEffect$1(() => {
      directionRef.current = direction;
    }, [direction]);
    useLayoutEffect$1(() => {
      durationRef.current = duration;
    }, [duration]);
    useLayoutEffect$1(() => {
      var _onTransitionUpdateRe;

      if (direction && phase) (_onTransitionUpdateRe = onTransitionUpdateRef.current) === null || _onTransitionUpdateRe === void 0 ? void 0 : _onTransitionUpdateRe.call(onTransitionUpdateRef, direction, phase);
    }, [direction, phase]); // Every time the phase changes to "transition", add our transition timeout timeouts
    // to catch any time onTransitionEnd fails to report for whatever reason to be safe

    useLayoutEffect$1(() => {
      if (phase == "transition") {
        var _durationRef$current;

        const timeoutDuration = (_durationRef$current = durationRef.current) !== null && _durationRef$current !== void 0 ? _durationRef$current : 1000;
        tooEarlyTimeoutRef.current = window.setTimeout(() => {
          tooEarlyValueRef.current = false;
          tooEarlyTimeoutRef.current = null;
        }, 50);
        tooLateTimeoutRef.current = window.setTimeout(() => {
          tooEarlyValueRef.current = true;
          tooLateTimeoutRef.current = null;
          setPhase("finalize");
        }, timeoutDuration);
      }

      return () => {
        if (tooEarlyTimeoutRef.current) clearTimeout(tooEarlyTimeoutRef.current);
        if (tooLateTimeoutRef.current) clearTimeout(tooLateTimeoutRef.current);
      };
    }, [phase]); // Any time "show" changes, update our direction and phase.
    // In addition, measure the size of the element if requested.

    useLayoutEffect$1(() => {
      const element = getElement();

      if (element && show != null) {
        const previousPhase = phaseRef.current; // Swap our direction

        if (show) setDirection("enter");else setDirection("exit");
        setPhase(previousPhase === null ? "finalize" : "init");

        if (measure) {
          let currentSizeWithTransition = element.getBoundingClientRect();
          {
            const {
              x,
              y,
              width,
              height
            } = currentSizeWithTransition;
            setTransitioningX(x + "px");
            setTransitioningY(y + "px");
            setTransitioningWidth(width + "px");
            setTransitioningHeight(height + "px");
          }

          if (previousPhase === "finalize") {
            // We're going to be messing with the actual element's class, 
            // so we'll want an easy way to restore it later.
            const backup = element.className;
            element.classList.add(`${classBase}-measure`);
            element.classList.remove(`${classBase}-enter`, `${classBase}-enter-init`, `${classBase}-enter-transition`, `${classBase}-enter-finalize`, `${classBase}-exit`, `${classBase}-exit-init`, `${classBase}-exit-transition`, `${classBase}-exit-finalize`);
            forceReflow(element);
            const sizeWithoutTransition = element.getBoundingClientRect();
            const {
              x,
              y,
              width,
              height
            } = sizeWithoutTransition;
            setSurfaceX(x + "px");
            setSurfaceY(y + "px");
            setSurfaceWidth(width + "px");
            setSurfaceHeight(height + "px");
            element.className = backup;
            forceReflow(element);
          }
        }
      }
    }, [show, measure, classBase]); // Any time the phase changes to init, immediately before the screen is painted,
    // change the phase to "transition" and re-render ().

    useLayoutEffect$1(() => {
      const element = getElement();

      if (element && directionRef.current != null) {
        var _classBase2;

        (_classBase2 = classBase) !== null && _classBase2 !== void 0 ? _classBase2 : classBase = "transition";

        if (phase === "init") {
          // Preact just finished rendering init
          // Now set our transition style.
          setPhase("transition");

          if (measure) {
            forceReflow(element);
          }
        }
      }
    }, [phase, measure]);
    const inlineDirection = logicalDirectionInfo === null || logicalDirectionInfo === void 0 ? void 0 : logicalDirectionInfo.inlineDirection;
    const blockDirection = logicalDirectionInfo === null || logicalDirectionInfo === void 0 ? void 0 : logicalDirectionInfo.blockDirection;
    const writingModeIsHorizontal = inlineDirection == "rtl" || inlineDirection == "ltr";
    const surfaceInlineInset = writingModeIsHorizontal ? surfaceX : surfaceY;
    const surfaceBlockInset = writingModeIsHorizontal ? surfaceY : surfaceX;
    const surfaceInlineSize = writingModeIsHorizontal ? surfaceWidth : surfaceHeight;
    const surfaceBlockSize = writingModeIsHorizontal ? surfaceHeight : surfaceWidth;
    const transitioningInlineInset = writingModeIsHorizontal ? transitioningX : transitioningY;
    const transitioningBlockInset = writingModeIsHorizontal ? transitioningY : transitioningX;
    const transitioningInlineSize = writingModeIsHorizontal ? transitioningWidth : transitioningHeight;
    const transitioningBlockSize = writingModeIsHorizontal ? transitioningHeight : transitioningWidth;
    let almostDone = useRefElementProps(useLogicalDirectionProps({
      ref,
      style: removeEmpty({
        [`--${classBase}-duration`]: duration,
        [`--${classBase}-surface-x`]: surfaceX,
        [`--${classBase}-surface-y`]: surfaceY,
        [`--${classBase}-surface-width`]: surfaceWidth,
        [`--${classBase}-surface-height`]: surfaceHeight,
        [`--${classBase}-surface-inline-inset`]: surfaceInlineInset,
        [`--${classBase}-surface-block-inset`]: surfaceBlockInset,
        [`--${classBase}-surface-inline-size`]: surfaceInlineSize,
        [`--${classBase}-surface-block-size`]: surfaceBlockSize,
        [`--${classBase}-transitioning-x`]: transitioningX,
        [`--${classBase}-transitioning-y`]: transitioningY,
        [`--${classBase}-transitioning-width`]: transitioningWidth,
        [`--${classBase}-transitioning-height`]: transitioningHeight,
        [`--${classBase}-transitioning-inline-inset`]: transitioningInlineInset,
        [`--${classBase}-transitioning-block-inset`]: transitioningBlockInset,
        [`--${classBase}-transitioning-inline-size`]: transitioningInlineSize,
        [`--${classBase}-transitioning-block-size`]: transitioningBlockSize
      }),
      onTransitionEnd,
      ...{
        "aria-hidden": show ? undefined : "true"
      },
      className: clsx(direction && getClassName(classBase, direction), direction && phase && getClassName(classBase, direction, phase), exitVisibility == "removed" && `${classBase}-removed-on-exit`, exitVisibility == "visible" && `${classBase}-visible-on-exit`, `${classBase}-inline-direction-${inlineDirection !== null && inlineDirection !== void 0 ? inlineDirection : "ltr"}`, `${classBase}-block-direction-${blockDirection !== null && blockDirection !== void 0 ? blockDirection : "ttb"}`)
    }));
    return useMergedProps()(almostDone, otherProps);
  }

  function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
  }
  /**
   * A component that *wraps an HTMLElement or other ref-forwarding component* and allows it to use CSS to transition in/out.
   * Combines the props passed to it, the props its child has, and the props needed for the CSS transition, and passes them
   * all to the child element you provide.
   *
   * This is the most general component that others use as a base. By default, this component by itself doesn't actually add any CSS classes that animate anything (like opacity, for example).
   * It adds classes like `transition-enter-finalize`, but you need to provide the additional e.g. `fade` class that reacts to it.
   *
   * Use this if the other, more specialized Transition components don't fit your needs.
   *
   * @example `<Transitionable show={show} {...useCreateFadeProps(...)}><div>{children}</div></Transitionable>`
   * @example `<Transitionable show={show}><div {...useCreateFadeProps(...)}>{children}</div></Transitionable>`
   */


  const Transitionable = forwardElementRef$1(function Transition({
    children: child,
    duration,
    classBase,
    measure,
    exitVisibility,
    show,
    onTransitionUpdate,
    animateOnMount,
    childMountBehavior,
    ...props
  }, r) {
    const [hasShownOnce, setHasShownOnce] = useState$1(false);
    const shouldSetHasShownOnce = hasShownOnce === false && childMountBehavior === "mount-on-show" && show === true;
    useEffect$1(() => {
      if (shouldSetHasShownOnce) setHasShownOnce(true);
    }, [shouldSetHasShownOnce]);
    if (childMountBehavior === "mount-when-showing" && !show) child = createElement("div", null);
    if (childMountBehavior === "mount-on-show" && !show && hasShownOnce === false) child = createElement("div", null);

    if (!childIsVNode(child)) {
      throw new Error("A Transitionable component must have exactly one component child (e.g. a <div>, but not \"a string\").");
    }

    const transitionProps = useCreateTransitionableProps({
      classBase,
      duration,
      measure,
      show,
      animateOnMount,
      onTransitionUpdate,
      ref: r,
      exitVisibility
    }, props);
    const mergedWithChildren = useMergedProps()(transitionProps, { ...child.props,
      ref: child.ref
    });
    return cloneElement(child, mergedWithChildren);
  });

  function childIsVNode(child) {
    if (!child) return false;

    if (Array.isArray(child)) {
      return false;
    }

    if (typeof child != "object") return false;
    return "props" in child;
  }

  /**
   * Creates a set of props that implement a Clip transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
   * Be sure to merge these returned props with whatever the user passed in.
   */

  function useCreateClipProps({
    classBase,
    clipOrigin,
    clipOriginInline,
    clipOriginBlock,
    clipMin,
    clipMinInline,
    clipMinBlock
  }, otherProps) {
    var _classBase, _ref, _ref2, _ref3, _ref4;

    (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
    return useMergedProps()({
      className: clsx(`${classBase}-clip`),
      classBase,
      style: {
        [`--${classBase}-clip-origin-inline`]: (_ref = clipOriginInline !== null && clipOriginInline !== void 0 ? clipOriginInline : clipOrigin) !== null && _ref !== void 0 ? _ref : 0.5,
        [`--${classBase}-clip-origin-block`]: (_ref2 = clipOriginBlock !== null && clipOriginBlock !== void 0 ? clipOriginBlock : clipOrigin) !== null && _ref2 !== void 0 ? _ref2 : 0,
        [`--${classBase}-clip-min-inline`]: (_ref3 = clipMinInline !== null && clipMinInline !== void 0 ? clipMinInline : clipMin) !== null && _ref3 !== void 0 ? _ref3 : 1,
        [`--${classBase}-clip-min-block`]: (_ref4 = clipMinBlock !== null && clipMinBlock !== void 0 ? clipMinBlock : clipMin) !== null && _ref4 !== void 0 ? _ref4 : 0
      }
    }, otherProps);
  }
  const Clip = forwardElementRef$1(function Clip({
    classBase,
    clipOrigin,
    clipOriginInline,
    clipOriginBlock,
    clipMin,
    clipMinInline,
    clipMinBlock,
    show,
    ...rest
  }, ref) {
    return createElement(Transitionable, {
      show: show,
      ...useCreateClipProps({
        classBase,
        clipOrigin,
        clipOriginInline,
        clipOriginBlock,
        clipMin,
        clipMinInline,
        clipMinBlock
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Creates a set of props that implement a Fade transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
   * Be sure to merge these returned props with whatever the user passed in.
   */

  function useCreateFadeProps({
    classBase,
    fadeMin,
    fadeMax
  }, otherProps) {
    var _classBase;

    (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
    return useMergedProps()({
      className: `${classBase}-fade`,
      classBase,
      style: {
        [`--${classBase}-fade-min`]: fadeMin !== null && fadeMin !== void 0 ? fadeMin : 0,
        [`--${classBase}-fade-max`]: fadeMax !== null && fadeMax !== void 0 ? fadeMax : 1
      }
    }, otherProps);
  }
  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with a Fade effect.
   *
   * Note that while it is absolutely possible to wrap another transition with `<Fade>`,
   * there will be some duplicate code run as two `<Transitionable>` components end up operating on the same element.
   * It's generally recommended to either use the components that include a combined fade effect,
   * or just directly a `<Transitionable>` on your own.
   *
   * @see `Transitionable`
   */

  const Fade = forwardElementRef$1(function Fade({
    classBase,
    fadeMin,
    fadeMax,
    show,
    ...rest
  }, ref) {
    return createElement(Transitionable, {
      show: show,
      ...useCreateFadeProps({
        classBase,
        fadeMin,
        fadeMax
      }, { ...rest,
        ref
      })
    });
  });

  const ClipFade = forwardElementRef$1(function ClipFade({
    classBase,
    fadeMin,
    fadeMax,
    show,
    ...rest
  }, ref) {
    return createElement(Clip, {
      show: show,
      ...useCreateFadeProps({
        classBase,
        fadeMin,
        fadeMax
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Creates a set of props that implement a Zoom transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
   * Be sure to merge these returned props with whatever the user passed in.
   *
   * IMPORTANT: If used outside of a `<Collapse />`, you must include the `measure` prop on the `<Transitionable>` that you use.
   *
   * @example <Transitionable measure {...useCreateCollapseProps(...)} />
   */

  function useCreateCollapseProps({
    classBase,
    minBlockSize
  }, otherProps) {
    var _classBase;

    (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
    return useMergedProps()({
      classBase,
      measure: true,
      className: `${classBase}-collapse`,
      style: {
        [`--${classBase}-collapse-min-block`]: minBlockSize !== null && minBlockSize !== void 0 ? minBlockSize : 0
      }
    }, otherProps);
  }
  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with a Collapse effect.
   *
   * *Important*: This component is *not* efficient for the browser to animate!
   * Make sure you do testing on lower power devices, or prefer a lighter
   * alternative, like `<Clip>`.
   *
   * @see `Transitionable`
   */

  const Collapse = forwardElementRef$1(function Collapse({
    classBase,
    show,
    minBlockSize,
    ...rest
  }, ref) {
    return createElement(Transitionable, {
      show: show,
      ...useCreateCollapseProps({
        classBase,
        minBlockSize
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with both Collapse and Fade effects.
   *
   * @see `Transitionable` `Collapse` `Fade`
   */

  forwardElementRef$1(function CollapseFade({
    classBase,
    fadeMin,
    fadeMax,
    show,
    ...rest
  }, ref) {
    return createElement(Collapse, {
      show: show,
      ...useCreateFadeProps({
        classBase,
        fadeMin,
        fadeMax
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Creates a set of props that implement a Slide transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
   */

  function useCreateSlideProps({
    classBase,
    slideTargetInline,
    slideTargetBlock
  }, otherProps) {
    var _classBase, _slideTargetInline, _slideTargetBlock, _slideTargetInline2, _slideTargetBlock2;

    (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
    const lastValidTargetInline = useRef((_slideTargetInline = slideTargetInline) !== null && _slideTargetInline !== void 0 ? _slideTargetInline : 1);
    const lastValidTargetBlock = useRef((_slideTargetBlock = slideTargetBlock) !== null && _slideTargetBlock !== void 0 ? _slideTargetBlock : 0);
    useEffect$1(() => {
      if (slideTargetInline) lastValidTargetInline.current = slideTargetInline;
    }, [slideTargetInline]);
    useEffect$1(() => {
      if (slideTargetBlock) lastValidTargetBlock.current = slideTargetBlock;
    }, [slideTargetBlock]);
    if (slideTargetInline == 0) slideTargetInline = lastValidTargetInline.current;
    if (slideTargetBlock == 0) slideTargetBlock = lastValidTargetBlock.current;
    return useMergedProps()({
      className: `${classBase}-slide`,
      classBase,
      style: {
        [`--${classBase}-slide-target-inline`]: `${(_slideTargetInline2 = slideTargetInline) !== null && _slideTargetInline2 !== void 0 ? _slideTargetInline2 : 0}`,
        [`--${classBase}-slide-target-block`]: `${(_slideTargetBlock2 = slideTargetBlock) !== null && _slideTargetBlock2 !== void 0 ? _slideTargetBlock2 : 0}`
      }
    }, otherProps);
  }
  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with a Slide effect.
   *
   * Provide the direction the element will travel in with `slideInline` and `slideBlock`,
   * with `1` being `100%` of the element's width or height.
   *
   * A value of `0` is handled specially, effectively meaning "use the last non-zero value",
   * which allows for convenient setups inside of a `SwapContainer`
   * (`slideInline={index - selectedIndex}` or similar.)
   *
   * @see `Transitionable`
   */

  const Slide = forwardElementRef$1(function Slide({
    classBase,
    slideTargetInline,
    slideTargetBlock,
    show,
    ...rest
  }, ref) {
    return createElement(Transitionable, {
      show: show,
      ...useCreateSlideProps({
        classBase,
        slideTargetInline,
        slideTargetBlock
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with both Slide and Fade effects.
   *
   * `slideInline={(index - selectedIndex) / 10}` would make the element look like it fades out before it travels to its target destination.
   *
   * @see `Transitionable` `Zoom`
   */

  const SlideFade = forwardElementRef$1(function SlideFade({
    classBase,
    fadeMin,
    fadeMax,
    show,
    ...rest
  }, ref) {
    return createElement(Slide, {
      show: show,
      ...useCreateFadeProps({
        classBase,
        fadeMin,
        fadeMax
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Creates a set of props that implement a Zoom transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
   */

  function useCreateZoomProps({
    classBase,
    zoomOrigin,
    zoomOriginInline,
    zoomOriginBlock,
    zoomMin,
    zoomMinInline,
    zoomMinBlock
  }, otherProps) {
    var _classBase, _ref, _ref2, _ref3, _ref4;

    (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
    return useMergedProps()({
      className: `${classBase}-zoom`,
      classBase,
      style: {
        [`--${classBase}-zoom-origin-inline`]: `${(_ref = zoomOriginInline !== null && zoomOriginInline !== void 0 ? zoomOriginInline : zoomOrigin) !== null && _ref !== void 0 ? _ref : 0.5}`,
        [`--${classBase}-zoom-origin-block`]: `${(_ref2 = zoomOriginBlock !== null && zoomOriginBlock !== void 0 ? zoomOriginBlock : zoomOrigin) !== null && _ref2 !== void 0 ? _ref2 : 0.5}`,
        [`--${classBase}-zoom-min-inline`]: `${(_ref3 = zoomMinInline !== null && zoomMinInline !== void 0 ? zoomMinInline : zoomMin) !== null && _ref3 !== void 0 ? _ref3 : 0}`,
        [`--${classBase}-zoom-min-block`]: `${(_ref4 = zoomMinBlock !== null && zoomMinBlock !== void 0 ? zoomMinBlock : zoomMin) !== null && _ref4 !== void 0 ? _ref4 : 0}`
      }
    }, otherProps);
  }
  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with a Zoom effect.
   * @see `Transitionable` `ZoomFade`
   */

  const Zoom = forwardElementRef$1(function Zoom({
    classBase,
    zoomOrigin,
    zoomOriginInline,
    zoomOriginBlock,
    zoomMin,
    zoomMinInline,
    zoomMinBlock,
    show,
    ...rest
  }, ref) {
    return createElement(Transitionable, {
      show: show,
      ...useCreateZoomProps({
        classBase,
        zoomOrigin,
        zoomOriginInline,
        zoomOriginBlock,
        zoomMin,
        zoomMinInline,
        zoomMinBlock
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with both Zoom and Fade effects.
   *
   * This is an ideal time to use the minimum size Zoom properties.
   *
   * @see `Transitionable` `Zoom`
   */

  const ZoomFade = forwardElementRef$1(function ZoomFade({
    classBase,
    fadeMin,
    fadeMax,
    show,
    ...rest
  }, ref) {
    return createElement(Zoom, {
      show: show,
      ...useCreateFadeProps({
        classBase,
        fadeMin,
        fadeMax
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with both Slide and Zoom effects.
   *
   * Probably best combined with `useCreateFadeProps` (or just using a `SlideZoomFade`?).
   *
   * @see `Transitionable` `SlideFadeZoom` `Zoom` `Fade`
   */

  const SlideZoom = forwardElementRef$1(function SlideZoom({
    classBase,
    zoomMin,
    zoomMinInline,
    zoomMinBlock,
    zoomOrigin,
    zoomOriginInline,
    zoomOriginBlock,
    show,
    ...rest
  }, ref) {
    return createElement(Slide, {
      show: show,
      ...useCreateZoomProps({
        classBase,
        zoomMin,
        zoomMinInline,
        zoomMinBlock,
        zoomOrigin,
        zoomOriginInline,
        zoomOriginBlock
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with Zoom, Slide, and Fade effects.
   *
   * Note that this is basically just shorthand for some prop creation and prop merging functions.
   *
   * @see `Transitionable` `Slide` `Zoom` `Fade`
   */

  forwardElementRef$1(function SlideZoomFade({
    classBase,
    fadeMin,
    fadeMax,
    show,
    ...rest
  }, ref) {
    return createElement(SlideZoom, {
      show: show,
      ...useCreateFadeProps({
        classBase,
        fadeMin,
        fadeMax
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Creates a set of props that implement a Flip transition. Like all `useCreate*Props` hooks, must be used in tamdem with a `Transitionable` component (or `useCreateTransitionableProps`).
   */

  function useCreateFlipProps({
    classBase,
    flipAngleInline,
    flipAngleBlock,
    perspective
  }, otherProps) {
    var _classBase, _flipAngleInline, _flipAngleBlock, _flipAngleInline2, _flipAngleBlock2;

    (_classBase = classBase) !== null && _classBase !== void 0 ? _classBase : classBase = "transition";
    const lastValidTargetInline = useRef((_flipAngleInline = flipAngleInline) !== null && _flipAngleInline !== void 0 ? _flipAngleInline : 180);
    const lastValidTargetBlock = useRef((_flipAngleBlock = flipAngleBlock) !== null && _flipAngleBlock !== void 0 ? _flipAngleBlock : 0);
    useEffect$1(() => {
      if (flipAngleInline) lastValidTargetInline.current = flipAngleInline;
    }, [flipAngleInline]);
    useEffect$1(() => {
      if (flipAngleBlock) lastValidTargetBlock.current = flipAngleBlock;
    }, [flipAngleBlock]);
    if (flipAngleInline == 0) flipAngleInline = lastValidTargetInline.current;
    if (flipAngleBlock == 0) flipAngleBlock = lastValidTargetBlock.current;
    return useMergedProps()({
      className: `${classBase}-flip`,
      classBase,
      style: {
        [`--${classBase}-flip-angle-inline`]: `${(_flipAngleInline2 = flipAngleInline) !== null && _flipAngleInline2 !== void 0 ? _flipAngleInline2 : 0}deg`,
        [`--${classBase}-flip-angle-block`]: `${(_flipAngleBlock2 = flipAngleBlock) !== null && _flipAngleBlock2 !== void 0 ? _flipAngleBlock2 : 0}deg`,
        [`--${classBase}-perspective`]: `${perspective !== null && perspective !== void 0 ? perspective : 800}px`
      }
    }, otherProps);
  }
  /**
   * Wraps a div (etc.) and allows it to transition in/out smoothly with a Flip effect.
   *
   * Provide the direction the element will travel in with `flipInline` and `flipBlock`,
   * with `1` being `100%` of the element's width or height.
   *
   * A value of `0` is handled specially, effectively meaning "use the last non-zero value",
   * which allows for convenient setups inside of a `SwapContainer`
   * (`flipInline={index - selectedIndex}` or similar.)
   *
   * @see `Transitionable`
   */

  const Flip = forwardElementRef$1(function Flip({
    classBase,
    flipAngleInline,
    flipAngleBlock,
    perspective,
    show,
    ...rest
  }, ref) {
    return createElement(Transitionable, {
      show: show,
      ...useCreateFlipProps({
        classBase,
        flipAngleInline,
        flipAngleBlock,
        perspective
      }, { ...rest,
        ref
      })
    });
  });

  /**
   * Creates a set of props that implement a swap container.
   * Be sure to merge these returned props with whatever the user passed in.
   */

  function useCreateSwappableProps({
    inline,
    classBase
  }, otherProps) {
    return useMergedProps()({
      className: clsx(`${classBase !== null && classBase !== void 0 ? classBase : "transition"}-swap-container`, inline && `${classBase !== null && classBase !== void 0 ? classBase : "transition"}-swap-container-inline`)
    }, otherProps);
  }
  /**
   * Allows a set of child <Transitionable> components to animate in & out in-place. Very useful for, e.g., tab panels.
   *
   * You must manage each child `<Transitionable>` component's `show` prop -- this component *does not* manage any sort of state in that regard.
   *
   * Like `<Transitionable>`, *this wraps an HTMLElement (or other ref-forwarding component)*. This will be your container that holds each `<Transitionable>` (or component that uses it). Strictly speaking it could be anything, not a `<Transitionable>`, but if it doesnt't transition out then it's just going to be hanging around 100% of the time.
   *
   * Long way of saying, if you get a cryptic error with this component, make sure it has a single `<div>` child or something.
   * @param param0
   * @returns
   */

  const Swappable = forwardElementRef$1(function Swappable({
    children,
    classBase,
    inline,
    ...p
  }, ref) {
    var _inline;

    (_inline = inline) !== null && _inline !== void 0 ? _inline : inline = typeof children.type === "string" && inlineElements.has(children.type);
    const transitionProps = useCreateSwappableProps({
      classBase,
      inline
    }, { ...p,
      ref
    });
    const mergedWithChildren = useMergedProps()(transitionProps, children.props);
    return cloneElement(children, mergedWithChildren);
  }); // If "inline" isn't explicitly provided, we try to implicitly do it based on the child's tag.
  // Not perfect, but it's not supposed to be. `inline` is for perfect.

  const inlineElements = new Set(["a", "abbr", "acronym", "audio", "b", "bdi", "bdo", "big", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "img", "input", "ins", "kbd", "label", "map", "mark", "meter", "noscript", "object", "output", "picture", "progress", "q", "ruby", "s", "samp", "script", "select", "slot", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "tt", "var", "video", "wbr"]);

  function forwardElementRef(component) {
    return forwardRef(component);
  }
  function usePseudoActive({
    "data-pseudo-active": active,
    ...props
  }) {
    return useMergedProps()({
      className: clsx((active == true || active == "true") && "active")
    }, props);
  }
  const SpinnerDelayContext = createContext(1000);
  function useSpinnerDelay(pending, timeout) {
    var _ref;

    const [showSpinner, setShowSpinner] = useState(false);
    useEffect$1(() => {
      if (!pending) {
        setShowSpinner(false);
      }
    }, [pending]);
    const defaultDelay = useContext(SpinnerDelayContext);
    useTimeout({
      timeout: (_ref = timeout !== null && timeout !== void 0 ? timeout : defaultDelay) !== null && _ref !== void 0 ? _ref : 1000,
      callback: () => {
        setShowSpinner(pending);
      },
      triggerIndex: pending
    });
    return showSpinner;
  }
  const DebugUtilContext = createContext(null);
  function useLogRender(type, ...args) {
    var _useContext;

    if ((_useContext = useContext(DebugUtilContext)) !== null && _useContext !== void 0 && _useContext.logRender.has(type)) {
      console.log(...args);
    }
  }

  const UseAriaAccordionSectionContext = createContext(null);
  const Accordion = memo(forwardElementRef(function Accordion({
    expandedIndex,
    setExpandedIndex,
    children,
    ...props
  }, ref) {
    useLogRender("Accordion", `Rendering Accordion`);
    const {
      useAriaAccordionSection
    } = useAriaAccordion({
      expandedIndex,
      setExpandedIndex
    });
    return createElement("div", { ...useMergedProps()({
        ref,
        className: "accordion elevation-raised-1 elevation-body-surface"
      }, props)
    }, createElement(UseAriaAccordionSectionContext.Provider, {
      value: useAriaAccordionSection
    }, children));
  }));
  const AccordionSection = memo(forwardElementRef(function AccordionSection({
    index,
    open,
    header,
    headerLevel,
    children,
    Transition,
    ...props
  }, ref) {
    var _Transition, _headerLevel;

    useLogRender("AccordionSection", `Rendering AccordionSection #${index}`);
    const useAriaAccordionSection = useContext(UseAriaAccordionSectionContext);
    const {
      expanded,
      useAriaAccordionSectionHeader,
      useAriaAccordionSectionBody
    } = useAriaAccordionSection({
      index,
      open
    });
    const {
      useAriaAccordionSectionHeaderProps
    } = useAriaAccordionSectionHeader({
      tag: "button"
    });
    const {
      useAriaAccordionSectionBodyProps
    } = useAriaAccordionSectionBody();
    (_Transition = Transition) !== null && _Transition !== void 0 ? _Transition : Transition = Collapse;
    (_headerLevel = headerLevel) !== null && _headerLevel !== void 0 ? _headerLevel : headerLevel = 2;
    const headerButtonProps = useAriaAccordionSectionHeaderProps({
      type: "button",
      class: clsx("accordion-button", !expanded ? " collapsed" : "")
    });
    const headerProps = {
      class: "accordion-header",
      children: createElement("button", { ...headerButtonProps
      }, header)
    };
    const headerJsx = headerLevel >= 1 && headerLevel <= 6 ? createElement(`h${headerLevel}`, headerProps) : createElement("div", useMergedProps()(headerProps, {
      role: "heading",
      "aria-level": `${headerLevel}`
    }));
    return createElement("div", { ...{
        ref,
        class: "accordion-item"
      }
    }, headerJsx, createElement(Transition, {
      show: expanded,
      ...useAriaAccordionSectionBodyProps(useMergedProps()(props, {
        class: ""
      }))
    }, createElement("div", null, createElement("div", {
      class: clsx("accordion-body", expanded && "elevation-depressed-2", "elevation-body-surface")
    }, children))));
  }));

  // presumably because the number of elements changes. 
  // (and in really weird ways -- changing the animation speed in the console fixes it until you put it back at 100% speed???).
  // Assuming that's the case, it's easier to just take care of the element count on page load.

  let gimmickCount = 8;

  (() => {
    var _getFromLocalStorage;

    let lastSet = (_getFromLocalStorage = getFromLocalStorage()("circular-progress-gimmick-last-set", str => new Date(str))) !== null && _getFromLocalStorage !== void 0 ? _getFromLocalStorage : new Date(1970, 0, 1);
    const daysSinceLastGimmickSet = Math.floor((+new Date() - +lastSet) / 1000 / 60 / 60 / (24 - 5));

    if (daysSinceLastGimmickSet > 0) {
      let newCount = 4 + Math.round(Math.random() * 2 + Math.random() * 2);
      gimmickCount = newCount;
      storeToLocalStorage()("circular-progress-gimmick-last-set", new Date(), d => d.toISOString());
      storeToLocalStorage()("circular-progress-gimmick-count", gimmickCount, JSON.stringify);
    } else {
      var _getFromLocalStorage2;

      gimmickCount = (_getFromLocalStorage2 = getFromLocalStorage()("circular-progress-gimmick-count", JSON.parse)) !== null && _getFromLocalStorage2 !== void 0 ? _getFromLocalStorage2 : 8;
    }
  })();

  function useAriaProgressBar({
    tag,
    max,
    value,
    valueText
  }) {
    //const { inputId, labelId, useGenericLabelInput, useGenericLabelLabel, useReferencedInputIdProps, useReferencedLabelIdProps } = useGenericLabel({ inputPrefix: "progressbar-", labelPrefix: "progressbar-reference-" });
    const {
      id: progressBarId,
      getId,
      useRandomIdProps,
      useReferencedIdProps
    } = useRandomId({
      prefix: "progressbar-"
    });

    function useProgressProps({
      "aria-valuemax": ariaValueMax,
      "aria-valuenow": ariaValueNow,
      "aria-valuetext": ariaValueText,
      role,
      ...p
    }) {
      const extraProps = tag === "progress" ? {
        max,
        value: value !== null && value !== void 0 ? value : undefined,
        "aria-valuemin": "0",
        "aria-valuenow": value == null ? undefined : `${value}`
      } : {
        "aria-valuemin": "0",
        "aria-valuemax": max == null ? undefined : `${max}`,
        "aria-valuetext": valueText == null ? undefined : `${valueText}`,
        "aria-valuenow": value == null ? undefined : `${value}`,
        role: "progressbar"
      };
      return useRandomIdProps(useMergedProps()(extraProps, p));
    }

    const useReferencedElement = useCallback(function useReferencedElement() {
      function useReferencedProps(props) {
        return useReferencedIdProps("aria-controls")(props);
      }

      return {
        useReferencedProps
      };
    }, [useReferencedIdProps]);
    return {
      useProgressProps,
      useReferencedElement
    };
  }
  const ProgressAsChildContext = createContext(undefined);
  const ProgressMaxContext = createContext(undefined);
  const ProgressValueContext = createContext(undefined);
  const ProgressValueTextContext = createContext(undefined);
  /**
   * A progress bar can either take its value & max arguments directly,
   * or have them provided by a parent via varions Context objects.
   *
   * Props will be prioritized over context if both are given.
   * @param param0
   * @returns
   */

  memo(forwardElementRef(function ProgressLinear({
    colorVariant,
    max: maxProp,
    value: valueProp,
    valueText: valueTextProp,
    striped,
    variant,
    ...rest
  }, ref) {
    let value = useContext(ProgressValueContext);
    let max = useContext(ProgressMaxContext);
    let valueText = useContext(ProgressValueTextContext);
    if (value === undefined) value = valueProp;
    if (max === undefined) max = maxProp;
    if (valueText === undefined) valueText = valueTextProp;
    const provideParentWithHook = useContext(ProgressAsChildContext);
    const {
      useProgressProps,
      useReferencedElement
    } = useAriaProgressBar({
      value,
      valueText,
      max,
      tag: "progress"
    });
    useLayoutEffect$1(() => {
      provideParentWithHook === null || provideParentWithHook === void 0 ? void 0 : provideParentWithHook(useReferencedElement);
    }, [useReferencedElement, provideParentWithHook]);
    return createElement("div", { ...useMergedProps()({
        ref,
        className: clsx("progress", `bg-${colorVariant !== null && colorVariant !== void 0 ? colorVariant : "primary"}`)
      }, rest)
    }, createElement("progress", { ...useProgressProps({
        className: "progress-bar"
      })
    }));
  })); // :)

  new Date().getDate() % 2;

  const ProgressCircular = forwardElementRef(function ({
    loadingLabel,
    spinnerTimeout,
    mode,
    colorFill,
    childrenPosition,
    children,
    colorVariant,
    ...p
  }, ref) {
    var _loadingLabel, _childrenPosition;

    (_loadingLabel = loadingLabel) !== null && _loadingLabel !== void 0 ? _loadingLabel : loadingLabel = "Operation pending";
    const {
      useProgressProps,
      useReferencedElement
    } = useAriaProgressBar({
      value: null,
      valueText: loadingLabel,
      max: 1,
      tag: "div"
    }); //useLayoutEffect(() => { provideParentWithHook?.(useReferencedElement) }, [useReferencedElement, provideParentWithHook])

    useState(`-${Math.random() * 30}s`);
    const {
      useReferencedProps
    } = useReferencedElement();
    useSpinnerDelay(mode === "pending", spinnerTimeout); //const [spinnerShowCount, setSpinnerShowCount] = useState(0);
    //useEffect(() => { setSpinnerShowCount(s => ++s) }, [showSpinner]);

    useEffect$1(() => {
      setShownStatusLongEnough(false);
    }, [mode]);
    const [shownStatusLongEnough, setShownStatusLongEnough] = useState(false);
    useTimeout({
      callback: () => {
        if (mode == "failed" || mode == "succeeded") setShownStatusLongEnough(true);
      },
      timeout: 1000,
      triggerIndex: mode
    }); // This is used to ensure that the "success" icon
    // is only shown immediately after a failure has occurred.

    const [previousSettledMode, setPreviousSettledMode, getPreviousSettledMode] = useState("pending");
    const [succeededAfterFailure, setSucceededAfterFailure, getSucceededAfterFailure] = useState(false);
    useEffect$1(() => {
      if (getSucceededAfterFailure()) setSucceededAfterFailure(false);

      if (mode == "succeeded") {
        if (getPreviousSettledMode() == "failed") {
          setSucceededAfterFailure(true);
        }

        setPreviousSettledMode(mode);
      } else if (mode == "failed") {
        setPreviousSettledMode("failed");
      }
    }, [mode]);
    useProgressProps({
      "aria-hidden": `${mode != "pending"}`
    });
    const progressElement = null;
    /*(
    <div {...useMergedProps<HTMLDivElement>()({ ref, className: clsx("circular-progress-container") }, useMergedProps<HTMLDivElement>()(progressProps, p))}>
    {mode === "pending" && !!loadingLabel && <div role="alert" aria-live="assertive" class="visually-hidden">{loadingLabel}</div>}
    <Swappable>
    <div className="circular-progress-swappable">
    <Fade show={mode === "pending" && showSpinner} exitVisibility="removed">
    <div style={{ "--count": gimmickCount, "--delay": delay } as any} className={clsx("circular-progress", colorVariant ? `circular-progress-${colorVariant}` : undefined, colorFill == "foreground" && "inverse-fill", colorFill === "foreground-only" && "no-fill")}>
    {Array.from(function* () {
    for (let i = 0; i < gimmickCount; ++i)
      yield <div class={clsx("circular-progress-ball-origin", `circular-progress-ball-origin-${i}`)}><div class="circular-progress-ball" /></div>;
    }())}
    </div>
    </Fade>
    <Fade show={!shownStatusLongEnough && mode === "succeeded" && succeededAfterFailure}><div class="circular-progress-succeeded"><Check /></div></Fade>
    <Fade show={!shownStatusLongEnough && mode === "failed"}><div class="circular-progress-failed"><Cross /></div></Fade>
    </div>
    </Swappable>
    </div>);*/

    (_childrenPosition = childrenPosition) !== null && _childrenPosition !== void 0 ? _childrenPosition : childrenPosition = "after";
    return createElement(Fragment, null, childrenPosition == "before" && progressElement, children && createElement(children.type, useMergedProps()({
      children: childrenPosition === "child" ? progressElement : undefined,
      ref: children.ref
    }, useReferencedProps(children.props))), childrenPosition == "after" && progressElement);
  });

  const UseButtonGroupChild = createContext(null);
  const DefaultFillStyleContext = createContext("fill");
  const DefaultColorStyleContext = createContext("primary");
  const DefaultSizeContext = createContext("md");
  const DefaultDisabledContext = createContext(false);
  const ProvideDefaultButtonFill = memo(function ProvideDefaultButtonFill({
    value,
    children
  }) {
    return createElement(DefaultFillStyleContext.Provider, {
      value: value
    }, children);
  });
  const ProvideDefaultButtonColor = memo(function ProvideDefaultButtonColor({
    value,
    children
  }) {
    return createElement(DefaultColorStyleContext.Provider, {
      value: value
    }, children);
  });
  const ProvideDefaultButtonSize = memo(function ProvideDefaultButtonSize({
    value,
    children
  }) {
    return createElement(DefaultSizeContext.Provider, {
      value: value
    }, children);
  });
  const ProvideDefaultButtonDisabled = memo(function ProvideDefaultButtonDisabled({
    value,
    children
  }) {
    return createElement(DefaultDisabledContext.Provider, {
      value: value
    }, children);
  });
  function useButtonFillVariant(providedValue) {
    const defaultFill = useContext(DefaultFillStyleContext);
    return providedValue !== null && providedValue !== void 0 ? providedValue : defaultFill;
  }
  function useButtonColorVariant(providedValue) {
    const defaultColor = useContext(DefaultColorStyleContext);
    return providedValue !== null && providedValue !== void 0 ? providedValue : defaultColor;
  }
  function useButtonSize(providedValue) {
    const defaultSize = useContext(DefaultSizeContext);
    return providedValue !== null && providedValue !== void 0 ? providedValue : defaultSize;
  }
  function useButtonDisabled(providedValue) {
    const defaultDisabled = useContext(DefaultDisabledContext);
    return providedValue !== null && providedValue !== void 0 ? providedValue : defaultDisabled;
  }
  function useButtonStyles(p, tag) {
    let {
      colorVariant,
      size,
      fillVariant,
      disabled
    } = p;
    colorVariant = useButtonColorVariant(colorVariant);
    size = useButtonSize(size);
    fillVariant = useButtonFillVariant(fillVariant);
    disabled = useButtonDisabled(disabled);

    const useButtonStylesProps = props => useMergedProps()({
      type: tag === "button" ? "button" : undefined,
      "aria-disabled": disabled ? "true" : undefined,
      className: clsx(disabled && "disabled", "btn", `btn-${fillVariant == "outline" ? `outline-` : ``}${colorVariant}`, `btn-${size}`, disabled && "disabled")
    }, props);

    return {
      colorVariant,
      size,
      fillVariant,
      disabled,
      useButtonStylesProps
    };
  }

  function ButtonR(p, ref) {
    var _p$tag;

    if (((_p$tag = p.tag) === null || _p$tag === void 0 ? void 0 : _p$tag.toLowerCase()) === "a" || !!p.href) return createElement(AnchorButton, {
      ref: ref,
      ...p
    });else if (p.pressed != null) return createElement(ToggleButton, {
      ref: ref,
      ...p
    });else return createElement(ButtonButton, {
      ref: ref,
      ...p
    });
  }

  const AnchorButton = forwardElementRef(function AnchorButton(p, ref) {
    let {
      colorVariant,
      size,
      fillVariant,
      disabled,
      ...props
    } = p;
    const buttonStyleInfo = useButtonStyles({
      colorVariant,
      size,
      fillVariant,
      disabled
    }, "a");
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    fillVariant = buttonStyleInfo.fillVariant;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
    return createElement("a", { ...usePseudoActive(useButtonStylesProps({ ...props,
        ref
      }))
    });
  });
  const ButtonButton = forwardElementRef(function ButtonButton(p, ref) {
    let {
      dropdownVariant,
      colorVariant,
      size,
      fillVariant,
      disabled,
      debounce,
      spinnerTimeout,
      onPress: onPressAsync,
      ...props
    } = p;
    const {
      getSyncHandler,
      pending,
      settleCount,
      hasError
    } = useAsyncHandler()({
      debounce,
      capture: useCallback(() => {
        return undefined;
      }, [])
    });
    disabled || (disabled = pending);
    const onPress = getSyncHandler(pending ? null : onPressAsync);
    const {
      useAriaButtonProps
    } = useAriaButton({
      tag: "button",
      onPress
    });
    const buttonStyleInfo = useButtonStyles({
      colorVariant,
      size,
      fillVariant,
      disabled
    }, "button");
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    fillVariant = buttonStyleInfo.fillVariant;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
    return createElement(ProgressCircular, {
      spinnerTimeout: spinnerTimeout,
      mode: hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null,
      childrenPosition: "child",
      colorFill: fillVariant == "fill" ? "foreground" : "background"
    }, createElement("button", { ...usePseudoActive(useButtonStylesProps(useMergedProps()({
        type: "button",
        className: clsx(pending && "pending active", disabled && "disabled", dropdownVariant && `dropdown-toggle`, dropdownVariant === "separate" && `dropdown-toggle-split`)
      }, useAriaButtonProps({ ...props,
        onPress,
        ref
      }))))
    }));
  });
  const ToggleButton = forwardElementRef(function ToggleButton(p, ref) {
    let {
      colorVariant,
      size,
      disabled,
      pressed,
      debounce,
      onPressToggle: onPressAsync,
      showAsyncSuccess,
      ...props
    } = p;
    !!useContext(UseButtonGroupChild);
    const getPressed = useStableGetter(pressed);
    const {
      getSyncHandler,
      pending,
      hasError,
      settleCount,
      hasCapture,
      currentCapture
    } = useAsyncHandler()({
      debounce,
      capture: useCallback(() => {
        return !getPressed();
      }, [])
    });
    if (hasCapture && pending) pressed = !!currentCapture;
    disabled || (disabled = pending);
    const fillVariant = pressed ? "fill" : "outline";
    const onPress = getSyncHandler(pending ? null : onPressAsync);
    const {
      useAriaButtonProps
    } = useAriaButton({
      tag: "button",
      pressed,
      onPress
    });
    const buttonStyleInfo = useButtonStyles({
      colorVariant,
      size,
      fillVariant,
      disabled
    }, "button");
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
    return createElement(ProgressCircular, {
      mode: hasError ? "failed" : pending ? "pending" : settleCount && showAsyncSuccess ? "succeeded" : null,
      childrenPosition: "child",
      colorFill: fillVariant == "fill" ? "foreground" : "background"
    }, createElement("button", { ...usePseudoActive(useAriaButtonProps(useButtonStylesProps({ ...useMergedProps()({
          className: clsx("toggle-button", pressed && "active"),
          ref
        }, props)
      })))
    }));
  });
  const Button = forwardElementRef(ButtonR);

  const ButtonGroup = memo(forwardElementRef(function ButtonGroup(p, ref) {
    useLogRender("ButtonGroup", `Rendering ButtonGroup`);
    const {
      useHasFocusProps,
      getFocusedInner
    } = useHasFocus({});
    const {
      indicesByElement,
      managedChildren,
      useListNavigationChild,
      navigateToIndex,
      childCount
    } = useListNavigation({
      shouldFocusOnChange: getFocusedInner
    }); // Styling props

    let {
      colorVariant,
      fillVariant,
      size,
      disabled,
      selectedIndex,
      wrap,
      children,
      ...p3
    } = p;
    useEffect$1(() => {
      if (selectedIndex != null) navigateToIndex(selectedIndex);
    }, [selectedIndex]); // Build new DOM props to merge based off the styling props

    colorVariant = useButtonColorVariant(colorVariant);
    size = useButtonSize(size);
    fillVariant = useButtonFillVariant(fillVariant);
    disabled = useButtonDisabled(disabled);
    const outerDomProps = useHasFocusProps(useMergedProps()({
      ref,
      class: "btn-group-aria-gridrow"
    }, p3));
    const innerDomProps = {
      role: "toolbar",
      disabled,
      className: clsx("btn-group", wrap && "wrap")
    }; // Remaining props, forwarded onto the DOM
    //const domProps =newDomProps, p3));

    outerDomProps["data-child-count"] = `${childCount}`;
    return createElement(UseButtonGroupChild.Provider, {
      value: useListNavigationChild
    }, createElement(ProvideDefaultButtonColor, {
      value: colorVariant
    }, createElement(ProvideDefaultButtonFill, {
      value: fillVariant
    }, createElement(ProvideDefaultButtonSize, {
      value: size
    }, createElement(ProvideDefaultButtonDisabled, {
      value: disabled
    }, createElement("div", { ...outerDomProps
    }, createElement("div", { ...innerDomProps
    }, children)))))));
  }));
  const ButtonGroupChild = memo(forwardElementRef(function ButtonGroupChild1({
    index,
    ...buttonProps
  }, ref) {
    useLogRender("ButtonGroupChild", `Rendering ButtonGroupChild #${index}`); // This is more-or-less forced to be a separate component because of the index prop.
    // It would be really nice to find a way to make that implicit based on DOM location,
    // specifically for small things like button groups...

    const useButtonGroupChild = useContext(UseButtonGroupChild);
    const {
      tabbable,
      useListNavigationChildProps,
      useListNavigationSiblingProps
    } = useButtonGroupChild({
      index,
      text: null
    });
    const p = useListNavigationChildProps(useMergedProps()({
      ref
    }, { ...buttonProps
    }));
    return createElement(Button, { ...p
    });
  }));

  createElement(Button, {
    pressed: true,
    onPress: p => console.log(p)
  });

  const baseId = generateRandomId("render-portal-container-");
  const BodyPortalClassContext = createContext("");
  memo(function SetBodyPortalClass({
    className,
    children
  }) {
    return createElement(BodyPortalClassContext.Provider, {
      value: className
    }, children);
  });
  function BodyPortal({
    children
  }) {
    const id = useRef(null);
    const [portalElement, setPortalElement] = useState$1(null);
    const bodyPortalClass = useContext(BodyPortalClassContext);
    useEffect$1(() => {
      if (id.current == null) {
        id.current = generateRandomId();
      }

      let container = document.getElementById(baseId);

      if (!container) {
        container = document.createElement("div");
        container.id = baseId;
        container.className = "body-portal-container";
        document.body.appendChild(container);
      }

      let element = document.getElementById(id.current);

      if (!element) {
        element = document.createElement("div");
        element.className = `body-portal ${bodyPortalClass}`;
        element.id = id.current;
        container.appendChild(element);
      }

      setPortalElement(element);
      return () => {
        var _element;

        return document.contains(element) ? (_element = element) === null || _element === void 0 ? void 0 : _element.remove() : undefined;
      };
    }, [bodyPortalClass]);
    if (portalElement) return createPortal(children, portalElement);else return null;
  }

  const Dialog = memo(forwardElementRef(function Dialog({
    onClose,
    open,
    descriptive,
    title,
    footer,
    Transition,
    children,
    ...rest
  }, ref) {
    const {
      useDialogBackdrop,
      useDialogBody,
      useDialogProps,
      useDialogTitle
    } = useAriaDialog({
      open,
      onClose
    });
    const {
      useDialogBackdropProps
    } = useDialogBackdrop();
    const {
      useDialogBodyProps
    } = useDialogBody({
      descriptive
    });
    const {
      useDialogTitleProps
    } = useDialogTitle();
    return createElement(BodyPortal, null, createElement("div", {
      class: "modal-portal-container"
    }, createElement(Fade, {
      show: open
    }, createElement("div", { ...useDialogBackdropProps({
        class: "modal-backdrop backdrop-filter-transition"
      })
    })), createElement(Transition, { ...{
        ref,
        show: open,
        ...rest
      }
    }, createElement("div", { ...useDialogProps({
        class: "modal-dialog modal-dialog-scrollable"
      })
    }, createElement("div", {
      class: "modal-content elevation-raised-6 elevation-body-surface"
    }, title != null && createElement("div", { ...useDialogTitleProps({
        class: "modal-header"
      })
    }, createElement("h1", {
      class: "modal-title"
    }, title)), createElement("div", { ...useDialogBodyProps({
        class: "modal-body"
      })
    }, children), footer != null && createElement("div", {
      class: "modal-footer"
    }, footer))))));
  }));

  const Drawer = memo(function Drawer({
    onClose,
    open,
    descriptive,
    title,
    footer,
    closeButton,
    Transition,
    children,
    ...rest
  }) {
    const {
      useDrawerBackdrop,
      useDrawerBody,
      useDrawerProps,
      useDrawerTitle
    } = useDrawer({
      open,
      onClose
    });
    const {
      useDrawerBackdropProps
    } = useDrawerBackdrop();
    const {
      useDrawerBodyProps
    } = useDrawerBody({
      descriptive
    });
    const {
      useDrawerTitleProps
    } = useDrawerTitle();

    if (!Transition) {
      Transition = Slide;
      rest.slideTargetInline = -1;
    }

    return createElement(BodyPortal, null, createElement("div", null, createElement(Fade, {
      show: open
    }, createElement("div", { ...useDrawerBackdropProps({
        class: "offcanvas-backdrop backdrop-filter-transition"
      })
    })), createElement(Transition, { ...{
        show: open,
        ...rest
      }
    }, createElement("div", { ...useDrawerProps({
        class: "offcanvas offcanvas-start elevation-raised-5 elevation-body-surface",
        tabindex: -1
      })
    }, createElement("div", {
      class: "offcanvas-header"
    }, createElement("h5", { ...useDrawerTitleProps({
        class: "offcanvas-title"
      })
    }, "Drawer"), closeButton !== null && closeButton !== void 0 ? closeButton : createElement(Button, {
      tag: "button",
      class: "btn-close text-reset",
      "aria-label": "Close",
      onPress: () => onClose("escape")
    })), createElement("div", { ...useDrawerBodyProps({
        class: "offcanvas-body"
      })
    }, children)))));
  });

  createContext(null);
  const InInputGroupContext = createContext(false);
  const InInputGridContext = createContext(0);

  function max$1(value, max) {
    if (max == null) return value;
    if (value > max) return max;
    return value;
  }

  function min$1(value, min) {
    if (min == null) return value;
    if (value < min) return min;
    return value;
  }
  /*
  export function useInputCaptures<T>(type: "text", min2: string, max2: string):
  export function useInputCaptures<T>(type: "text" | "number", min2: number, max2: number)
  export function useInputCaptures<T>(type: "text" | "number", min2: T, max2: T)*/


  function useInputCaptures(type, min2, max2) {
    const capture = useCallback(event => {
      switch (type) {
        case "text":
          return max$1(min$1(event.currentTarget.value, min2), max2);

        case "number":
          return max$1(min$1(event.currentTarget.valueAsNumber, min2), max2);
      }
    }, [type]);
    const uncapture = useCallback(value => {
      switch (type) {
        case "text":
          return value;

        case "number":
          if (value != null) return `${value}`;
          return "";
      }
    }, [type]);
    return {
      capture,
      uncapture
    };
  }

  const InputGrid = memo(forwardElementRef(function InputGrid({
    tag,
    children,
    ...props
  }, ref) {
    return createElement(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
      class: "input-grid",
      ref
    }, props), createElement(InInputGridContext.Provider, {
      value: useContext(InInputGridContext) + 1
    }, children));
  }));
  /**
   * An InputGroup, that puts an Input and its Label together, visually, into one component.
   *
   * All Input-type components automatically detect when they're in an InputGroup and render different accordingly.
   */

  const InputGroup = memo(forwardElementRef(function InputGroup({
    children,
    size,
    tag,
    ...props
  }, ref) {
    return createElement(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
      class: clsx("input-group", size && size != "md" && `input-group-${size}`),
      ref
    }, props), createElement(InInputGroupContext.Provider, {
      value: true
    }, children));
  }));
  /**
   * Not generally needed, since most input components come with labels that do this for you.
   *
   * That being said, if you just need a static block of text not hooked up to any input element, this is your component.
   */

  const InputGroupText = forwardElementRef(function InputGroupText({
    tag,
    children,
    disabled,
    ...props
  }, ref) {
    return createElement(tag !== null && tag !== void 0 ? tag : "div", useMergedProps()({
      class: clsx(disabled && "disabled", "input-group-text"),
      ref
    }, props), children);
  });

  function capture(e) {
    return e[EventDetail].checked;
  }
  /**
   * TODO: When inside an InputGroup, Checkboxes don't forward any properties or refs because there's no one DOM element to attach to.
   *
   * Probably need separate `inputRef` & `labelRef` properties for that,
   * but given there's also no easy way to forward props to just them a solution like that feels incomplete.
   */


  const Checkbox = memo(forwardElementRef(function Checkbox({
    checked,
    disabled,
    onCheck: onCheckedAsync,
    labelPosition,
    children: label,
    ...props
  }, ref) {
    var _labelPosition, _disabled;

    (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "end";
    const {
      getSyncHandler,
      pending,
      hasError,
      settleCount,
      hasCapture,
      currentCapture,
      currentType
    } = useAsyncHandler()({
      capture
    });
    disabled || (disabled = pending);
    const onChecked = getSyncHandler(onCheckedAsync);
    const {
      useCheckboxInputElement,
      useCheckboxLabelElement
    } = useAriaCheckbox({
      checked: pending ? currentCapture : checked === "indeterminate" ? "mixed" : checked,
      disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
      onInput: onChecked,
      labelPosition: "separate"
    });
    const {
      useCheckboxInputElementProps
    } = useCheckboxInputElement({
      tag: "input"
    });
    const {
      useCheckboxLabelElementProps
    } = useCheckboxLabelElement({
      tag: "label"
    });
    const inInputGroup = useContext(InInputGroupContext);
    let stringLabel = `${label}`;

    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
      console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
    const propsForInput = useMergedProps()(props, useCheckboxInputElementProps({
      ref,
      type: "checkbox",
      className: clsx("form-check-input", pending && "pending", disabled && "disabled", inInputGroup && "mt-0"),
      "aria-label": labelPosition === "hidden" ? stringLabel : undefined
    }));
    const inputElement = createElement(OptionallyInputGroup$1, {
      isInput: true,
      tag: inInputGroup ? "div" : null,
      tabIndex: -1,
      disabled: disabled
    }, createElement(ProgressCircular, {
      childrenPosition: "after",
      colorFill: "foreground-only",
      mode: currentType === "async" ? asyncState : null,
      colorVariant: "info"
    }, createElement("input", { ...propsForInput
    })));
    const p2 = { ...useCheckboxLabelElementProps({
        className: clsx(pending && "pending", disabled && "disabled", "form-check-label"),
        "aria-hidden": "true"
      })
    };
    const labelElement = createElement(Fragment, null, label != null && createElement(OptionallyInputGroup$1, {
      isInput: false,
      tag: "label",
      ...p2
    }, label));
    const ret = createElement(Fragment, null, labelPosition == "start" && labelElement, inputElement, labelPosition == "end" && labelElement);
    if (!inInputGroup) return createElement("div", { ...useMergedProps()({}, {
        class: "form-check"
      })
    }, ret);
    return ret;
  }));
  const OptionallyInputGroup$1 = forwardElementRef(function OptionallyInputGroup({
    tag,
    children,
    isInput,
    ...props
  }, ref) {
    const inInputGroup = useContext(InInputGroupContext);
    const inInputGrid = !!useContext(InInputGridContext);
    props = { ...props,
      ref
    };
    if (!inInputGroup) return createElement(tag !== null && tag !== void 0 ? tag : Fragment, props, children); // If we're in an InputGrid's InputGroup, then create a 
    // new child that's, CSS-wise, the "true" input.
    // The other one is used for its border styles and relative positioning.

    if (inInputGrid && isInput) children = createElement("div", {
      className: "input-group-text"
    }, children);
    return createElement(InputGroupText, {
      tag: tag !== null && tag !== void 0 ? tag : "div",
      ...useMergedProps()({
        className: clsx(isInput && inInputGrid && "faux-input-group-text")
      }, props)
    }, children);
  });

  createContext(null);
  createContext(false);
  createContext(null);

  const knownNames = new Set();
  const CurrentHandlerTypeContext = createContext("sync");
  const RadioGroupContext = createContext(null);
  const RadioGroup = memo(forwardElementRef(function RadioGroup({
    children,
    name,
    selectedValue,
    label,
    labelPosition,
    onValueChange: onInputAsync
  }, ref) {
    const {
      getSyncHandler,
      pending,
      hasError,
      settleCount,
      currentCapture,
      currentType
    } = useAsyncHandler()({
      capture: e => e[EventDetail].selectedValue
    });
    const onInput = getSyncHandler(onInputAsync);
    const {
      useRadio,
      useRadioGroupProps,
      managedChildren,
      selectedIndex
    } = useAriaRadioGroup({
      name,
      selectedValue: pending ? currentCapture : selectedValue,
      onInput: onInput
    });
    let stringLabel = undefined;

    if (labelPosition === "hidden") {
      if (label != null && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
      } else {
        stringLabel = `${label}`;
      }
    } // Debugging check -- multiple groups with the same name can cause weird glitches from native radio selection behavior.


    useEffect(() => {
      if (knownNames.has(name)) {
        console.error(`Multiple radio groups with the name "${name}" exist on the same page at the same time!`);
      }

      knownNames.add(name);
      return () => knownNames.delete(name);
    }, [name]); //useChildFlag(selectedIndex, managedChildren.length, (index, isSelected) =>{ managedChildren[index]?.setAsyncState(isSelected? (hasError? "failed" : pending? "pending" :  "succeeded") : null )});
    // Any time the selected index changes, let the previous radio button know that it shouldn't be displaying a spinner (if it was).

    const currentCheckboxPendingState = hasError ? "failed" : pending ? "pending" : "succeeded";
    useEffect(prev => {
      if (prev) {
        var _managedChildren$prev;

        const [prevSelectedIndex] = prev;
        if (prevSelectedIndex != null && prevSelectedIndex >= 0 && prevSelectedIndex < managedChildren.length) (_managedChildren$prev = managedChildren[prevSelectedIndex]) === null || _managedChildren$prev === void 0 ? void 0 : _managedChildren$prev.setAsyncState(null);
      }
    }, [selectedIndex]);
    useEffect(() => {
      var _managedChildren$sele;

      if (selectedIndex != null && selectedIndex >= 0 && selectedIndex < managedChildren.length) (_managedChildren$sele = managedChildren[selectedIndex]) === null || _managedChildren$sele === void 0 ? void 0 : _managedChildren$sele.setAsyncState(currentCheckboxPendingState);
    }, [selectedIndex, currentCheckboxPendingState]); // useChildFlag(pending ? capturedIndex : null, managedChildren.length, useCallback((index, isCaptured) => managedChildren[index].setPending(isCaptured? "in" : false), []));

    const {
      useGenericLabelLabel,
      useGenericLabelInput
    } = useGenericLabel({
      inputPrefix: "aria-radiogroup",
      labelPrefix: "aria-radiogroup-label",
      backupText: stringLabel
    });
    const {
      useGenericLabelInputProps
    } = useGenericLabelInput();
    const {
      useGenericLabelLabelProps
    } = useGenericLabelLabel();
    let labelJsx = createElement("div", { ...useGenericLabelLabelProps({})
    });
    let groupJsx = createElement("div", { ...useGenericLabelInputProps(useRadioGroupProps({
        ref,
        "aria-label": labelPosition === "hidden" ? stringLabel : undefined
      }))
    }, children);
    return createElement(CurrentHandlerTypeContext.Provider, {
      value: currentType !== null && currentType !== void 0 ? currentType : "sync"
    }, createElement(RadioGroupContext.Provider, {
      value: useRadio
    }, labelPosition == "start" && labelJsx, groupJsx, labelPosition == "end" && labelJsx));
  }));
  const Radio = memo(forwardElementRef(function Radio({
    disabled,
    children: label,
    index,
    value,
    labelPosition
  }, ref) {
    var _labelPosition, _disabled, _label;

    const useAriaRadio = useContext(RadioGroupContext);
    (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "end";
    const text = null;
    const currentHandlerType = useContext(CurrentHandlerTypeContext);
    const [asyncState, setAsyncState] = useState(null);
    disabled || (disabled = asyncState === "pending");
    const {
      useRadioInput,
      useRadioLabel
    } = useAriaRadio({
      disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
      labelPosition: "separate",
      index,
      text,
      value,
      setAsyncState
    });
    const {
      useRadioInputProps
    } = useRadioInput({
      tag: "input"
    });
    const {
      useRadioLabelProps
    } = useRadioLabel({
      tag: "label"
    });
    const inInputGroup = useContext(InInputGroupContext);
    (_label = label) !== null && _label !== void 0 ? _label : label = value;
    let stringLabel = `${label}`;

    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
      console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const inputElement = createElement(OptionallyInputGroup$1, {
      isInput: true,
      tag: inInputGroup ? "div" : null,
      disabled: disabled,
      tabIndex: -1
    }, createElement(ProgressCircular, {
      childrenPosition: "after",
      colorFill: "foreground-only",
      mode: currentHandlerType == "async" ? asyncState : null,
      colorVariant: "info"
    }, createElement("input", { ...useRadioInputProps({
        ref,
        type: "radio",
        className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-input"),
        "aria-label": labelPosition === "hidden" ? stringLabel : undefined
      })
    })));
    const labelElement = createElement(Fragment, null, label != null && createElement(OptionallyInputGroup$1, {
      isInput: false,
      tag: "label",
      ...useRadioLabelProps({
        className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-label"),
        "aria-hidden": "true"
      })
    }, label));
    const ret = createElement(Fragment, null, labelPosition == "start" && labelElement, inputElement, labelPosition == "end" && labelElement);
    if (!inInputGroup) return createElement("div", {
      class: "form-check"
    }, ret);
    return ret;
  }));

  /**
   * @see Checkbox
   * @param ref
   * @returns
   */

  const Switch = memo(forwardElementRef(function Switch({
    checked,
    disabled,
    onCheck: onInputAsync,
    children: label,
    labelPosition,
    ...rest
  }, ref) {
    var _labelPosition, _disabled;

    (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "end";
    const {
      getSyncHandler,
      pending,
      currentType,
      hasError,
      settleCount,
      currentCapture
    } = useAsyncHandler()({
      capture: e => e[EventDetail].checked
    });
    const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
    disabled || (disabled = pending);
    const onInput = getSyncHandler(onInputAsync);
    const {
      useCheckboxInputElement: useSwitchInputElement,
      useCheckboxLabelElement: useSwitchLabelElement
    } = useAriaCheckbox({
      checked: pending ? currentCapture : checked,
      disabled: (_disabled = disabled) !== null && _disabled !== void 0 ? _disabled : false,
      onInput,
      labelPosition: "separate"
    });
    const {
      useCheckboxInputElementProps: useSwitchInputElementProps
    } = useSwitchInputElement({
      tag: "input"
    });
    const {
      useCheckboxLabelElementProps: useSwitchLabelElementProps
    } = useSwitchLabelElement({
      tag: "label"
    });
    const inInputGroup = useContext(InInputGroupContext);
    let stringLabel = `${label}`;

    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
      console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const inputElement = createElement(OptionallyInputGroup, {
      tag: inInputGroup ? "div" : null,
      disabled: disabled,
      tabIndex: -1,
      isInput: true
    }, createElement(ProgressCircular, {
      childrenPosition: "after",
      colorFill: "foreground-only",
      mode: currentType === "async" ? asyncState : null,
      colorVariant: "info"
    }, createElement("input", { ...useSwitchInputElementProps({
        ref,
        type: "checkbox",
        className: clsx(pending && "pending", "form-check-input", disabled && "disabled"),
        "aria-label": labelPosition === "hidden" ? stringLabel : undefined
      })
    })));
    const p2 = { ...useSwitchLabelElementProps({
        className: clsx(pending && "pending", "form-check-label", disabled && "disabled"),
        "aria-hidden": "true"
      })
    };
    const labelElement = createElement(Fragment, null, label != null && createElement(OptionallyInputGroup, {
      tag: "label",
      isInput: false,
      ...p2
    }, label));
    const ret = createElement(Fragment, null, labelPosition == "start" && labelElement, inputElement, labelPosition == "end" && labelElement);
    if (!inInputGroup) return createElement("div", { ...useMergedProps()(rest, {
        class: "form-check form-switch"
      })
    }, ret);
    return ret;
  })); // Note: Slightly different from the others
  // (^^^^ I'm really glad I left that there)

  const OptionallyInputGroup = forwardElementRef(function OptionallyInputGroup({
    tag,
    isInput,
    children,
    ...props
  }, ref) {
    const inInputGroup = useContext(InInputGroupContext);
    const inInputGrid = useContext(InInputGridContext);
    props = { ...props,
      ref
    };
    if (!inInputGroup) return createElement(tag !== null && tag !== void 0 ? tag : Fragment, props, children);
    if (inInputGrid && isInput) children = createElement("div", {
      className: clsx(isInput && inInputGrid && "form-switch", "input-group-text")
    }, children);
    return createElement(InputGroupText, {
      tag: tag !== null && tag !== void 0 ? tag : "div",
      ...useMergedProps()({
        className: clsx("input-group-text", isInput && !inInputGrid && "form-switch", isInput && inInputGrid && "faux-input-group-text")
      }, props)
    }, children);
  });

  function UnlabelledInput({
    type,
    disabled,
    value,
    onValueChange: onInputAsync,
    ...props
  }) {
    const [focusedInner, setFocusedInner, getFocusedInner] = useState(false);
    const {
      capture,
      uncapture
    } = useInputCaptures(type, props.min, props.max);
    const {
      useHasFocusProps
    } = useHasFocus({
      onFocusedInnerChanged: setFocusedInner
    });
    const {
      getSyncHandler,
      currentCapture,
      pending,
      hasError,
      settleCount,
      flushDebouncedPromise,
      currentType,
      ...asyncInfo
    } = useAsyncHandler()({
      capture,
      debounce: type === "text" ? 1500 : undefined
    });
    const onInputIfValid = getSyncHandler(disabled ? null : onInputAsync);

    const onInput = e => {
      const target = e.currentTarget;

      if (type == "number") {
        // When typing numbers, they'll "autocorrect" to their
        // most natural represented form when the input re-renders.
        //
        // This is a problem when typing, e.g., "-5", because
        // when the user is typing character-by-character, 
        // the closest number to "-" is "NaN", which makes it
        // impossible to enter "-5" with the "-" as the first character.
        //
        // To fix this, we don't do anything if we received an onInput
        // event but there's no valid numeric representation for
        // whatever was typed.  We just ignore it, and wait until
        // an actual number comes in.
        //
        // NOTE: When valueAsNumber is NaN, value is "".  That means
        // that it's *NOT* possible to store the partially typed
        // value anywhere -- it's completely hidden away.
        if (target !== null && target !== void 0 && target.value || (target === null || target === void 0 ? void 0 : target.valueAsNumber) === 0) {
          return onInputIfValid === null || onInputIfValid === void 0 ? void 0 : onInputIfValid.bind(target)(e);
        }
      } else {
        return onInputIfValid === null || onInputIfValid === void 0 ? void 0 : onInputIfValid.bind(target)(e);
      }
    };

    const asyncState = hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null;
    const onBlur = flushDebouncedPromise;
    useContext(InInputGridContext);
    return createElement(ProgressCircular, {
      spinnerTimeout: 10,
      mode: currentType === "async" ? asyncState : null,
      childrenPosition: "after",
      colorVariant: "info"
    }, createElement("input", { ...useHasFocusProps(useMergedProps()(props, {
        "aria-disabled": disabled ? "true" : undefined,
        readOnly: disabled,
        onBlur,
        class: clsx("form-control", "faux-form-control-inner", disabled && "disabled", pending && "with-end-icon"),
        type,
        value: pending || focusedInner ? currentCapture : uncapture(value),
        onInput
      }))
    }));
  }

  const Input = memo(function Input({
    children,
    width,
    labelPosition,
    placeholder,
    ...props
  }) {
    var _labelPosition;

    (_labelPosition = labelPosition) !== null && _labelPosition !== void 0 ? _labelPosition : labelPosition = "start";
    const {
      inputId,
      labelId,
      useInputLabelInput,
      useInputLabelLabel
    } = useInputLabel({
      inputPrefix: "input-",
      labelPrefix: "input-label-"
    });
    const {
      useInputLabelInputProps
    } = useInputLabelInput();
    const {
      useInputLabelLabelProps
    } = useInputLabelLabel({
      tag: "label"
    });
    const isInInputGroup = useContext(InInputGroupContext);
    useContext(InInputGridContext);
    let stringLabel = `${children}`;

    if (children != null && (labelPosition === "hidden" || labelPosition === "placeholder")) {
      if (!["string", "number", "boolean"].includes(typeof children)) console.error(`Hidden labels require a string-based label for the aria-label attribute.`);else {
        props["aria-label"] = stringLabel;
        if (placeholder == null && labelPosition === "placeholder") placeholder = stringLabel;
      }
    }

    const labelJsx = createElement("label", { ...useInputLabelLabelProps({
        class: clsx(props.disabled && "disabled", isInInputGroup ? "input-group-text" : labelPosition != "floating" ? "form-label" : "")
      })
    }, children);
    let inputJsx = createElement(UnlabelledInput, {
      placeholder: placeholder,
      ...useInputLabelInputProps(props)
    }); //if (isInInputGrid) {

    inputJsx = createElement("div", {
      class: clsx("form-control faux-form-control-outer elevation-depressed-2", "elevation-body-surface", "focusable-within", props.value !== 0 && props.value == "" && "focus-within-only", props.disabled && "disabled"),
      style: width !== null && width !== void 0 && width.endsWith("ch") ? {
        "--form-control-width": width !== null && width !== void 0 ? width : "20ch"
      } : width ? {
        width
      } : undefined
    }, inputJsx); // }

    const inputWithLabel = createElement(Fragment, null, labelPosition === "start" && labelJsx, inputJsx, (labelPosition === "end" || labelPosition == "floating") && labelJsx);
    if (labelPosition !== "floating") return inputWithLabel;else return createElement("div", {
      class: "form-floating"
    }, inputJsx);
  });

  /**
   * Very simple, easy responsive grid that guarantees each column is the minimum size.
   *
   * Easy one-liners all around here!
   */

  const GridResponsive = memo(forwardElementRef(function ResponsiveGrid({
    tag,
    minWidth,
    children,
    ...props
  }, ref) {
    var _children$props$child, _children$props;

    const mergedProps = useMergedProps()({
      className: "responsive-grid",
      style: minWidth ? {
        "--grid-min-width": `${minWidth}`
      } : {},
      ref
    }, props);
    const passthroughProps = useMergedProps()(mergedProps, (_children$props$child = children === null || children === void 0 ? void 0 : (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children) !== null && _children$props$child !== void 0 ? _children$props$child : {});
    if (tag === "passthrough") return cloneElement(children, passthroughProps);else return createElement(tag !== null && tag !== void 0 ? tag : "div", mergedProps, children);
  }));
  /**
   * Very simple, easy static grid that guarantees the number of columns is displayed,
   * no matter how janky it looks.
   */

  const GridStatic = memo(forwardElementRef(function ResponsiveGrid({
    tag,
    columns,
    children,
    ...props
  }, ref) {
    var _children$props$child2, _children$props2;

    const mergedProps = useMergedProps()({
      className: "static-grid",
      style: typeof columns === "string" ? {
        "--static-grid-columns": columns
      } : {
        "--grid-column-count": columns
      },
      ref
    }, props);
    const passthroughProps = useMergedProps()(mergedProps, (_children$props$child2 = children === null || children === void 0 ? void 0 : (_children$props2 = children.props) === null || _children$props2 === void 0 ? void 0 : _children$props2.children) !== null && _children$props$child2 !== void 0 ? _children$props$child2 : {});
    if (tag === "passthrough") return cloneElement(children, passthroughProps);else return createElement(tag !== null && tag !== void 0 ? tag : "div", mergedProps, children);
  }));

  const UseListboxSingleItemContext = createContext(null);
  function ListSingle(props, ref) {
    useLogRender("ListSingle", `Rendering ListSingle`);
    const {
      onSelect: onSelectAsync,
      selectedIndex,
      selectionMode,
      collator,
      keyNavigation,
      noTypeahead,
      noWrap,
      typeaheadTimeout,
      tag,
      select,
      ...domProps
    } = props;
    const {
      getSyncHandler
    } = useAsyncHandler()({
      capture: e => e[EventDetail].selectedIndex
    });
    const onSelect = getSyncHandler(onSelectAsync);
    const {
      useListboxSingleItem,
      useListboxSingleLabel,
      useListboxSingleProps
    } = useAriaListboxSingle({
      onSelect,
      selectedIndex,
      selectionMode,
      typeaheadTimeout,
      noWrap,
      noTypeahead,
      keyNavigation,
      collator
    });
    return createElement(UseListboxSingleItemContext.Provider, {
      value: useListboxSingleItem
    }, createElement(tag, useMergedProps()({
      class: "list-group",
      ref
    }, useListboxSingleProps(domProps))));
  }
  const ListItemSingle = memo(forwardElementRef(function ListItemSingle(props, ref) {
    useLogRender("ListSingle", `Rendering ListSingleItem #${props.index}`);
    const useListItemSingle = useContext(UseListboxSingleItemContext);
    const {
      index,
      ...domProps
    } = { ...props,
      ref
    };
    const [text, setText] = useState(null);
    const {
      useRefElementProps,
      getElement
    } = useRefElement({});
    useMutationObserver(getElement, {
      subtree: true,
      onCharacterData: info => {
        var _getElement$innerText, _getElement;

        return setText((_getElement$innerText = (_getElement = getElement()) === null || _getElement === void 0 ? void 0 : _getElement.innerText) !== null && _getElement$innerText !== void 0 ? _getElement$innerText : "");
      }
    });
    const {
      getSelected,
      tabbable,
      selected,
      useListboxSingleItemProps
    } = useListItemSingle({
      index,
      text,
      tag: "li"
    });
    return createElement("li", { ...usePseudoActive(useMergedProps()({
        class: clsx("list-group-item", "list-group-item-action", selected && "active")
      }, useListboxSingleItemProps(useRefElementProps(domProps))))
    });
  }));

  var _globalThis$process, _globalThis$process2, _globalThis$process2$, _globalThis$process$e, _globalThis$process$e2;

  (_globalThis$process = globalThis.process) !== null && _globalThis$process !== void 0 ? _globalThis$process : globalThis.process = {};
  (_globalThis$process2$ = (_globalThis$process2 = globalThis.process).env) !== null && _globalThis$process2$ !== void 0 ? _globalThis$process2$ : _globalThis$process2.env = {};
  (_globalThis$process$e2 = (_globalThis$process$e = globalThis.process.env).NODE_ENV) !== null && _globalThis$process$e2 !== void 0 ? _globalThis$process$e2 : _globalThis$process$e.NODE_ENV = "development";

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  // import { isHTMLElement } from './instanceOf';
  function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
  includeScale) {

    var rect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1; // FIXME:
    // `offsetWidth` returns an integer while `getBoundingClientRect`
    // returns a float. This results in `scaleX` or `scaleY` being
    // non-1 when it should be for elements that aren't a full pixel in
    // width or height.
    // if (isHTMLElement(element) && includeScale) {
    //   const offsetHeight = element.offsetHeight;
    //   const offsetWidth = element.offsetWidth;
    //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
    //   // Fallback to 1 in case both values are `0`
    //   if (offsetWidth > 0) {
    //     scaleX = rect.width / offsetWidth || 1;
    //   }
    //   if (offsetHeight > 0) {
    //     scaleY = rect.height / offsetHeight || 1;
    //   }
    // }

    return {
      width: rect.width / scaleX,
      height: rect.height / scaleY,
      top: rect.top / scaleY,
      right: rect.right / scaleX,
      bottom: rect.bottom / scaleY,
      left: rect.left / scaleX,
      x: rect.left / scaleX,
      y: rect.top / scaleY
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    var isIE = navigator.userAgent.indexOf('Trident') !== -1;

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (process.env.NODE_ENV !== "production") {
      if (!isHTMLElement(arrowElement)) {
        console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
      }

      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(round(x * dpr) / dpr) || 0,
      y: round(round(y * dpr) / dpr) || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets;

    var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
        _ref3$x = _ref3.x,
        x = _ref3$x === void 0 ? 0 : _ref3$x,
        _ref3$y = _ref3.y,
        y = _ref3$y === void 0 ? 0 : _ref3$y;

    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom; // $FlowFixMe[prop-missing]

        y -= offsetParent[heightProp] - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right; // $FlowFixMe[prop-missing]

        x -= offsetParent[widthProp] - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref4) {
    var state = _ref4.state,
        options = _ref4.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

    if (process.env.NODE_ENV !== "production") {
      var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';

      if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
        return transitionProperty.indexOf(property) >= 0;
      })) {
        console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
      }
    }

    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
      // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
      // errors due to floating point numbers, so we need to check precision.
      // Safari returns a number <= 0, usually < -1 when pinch-zoomed
      // Feature detection fails in mobile emulation mode in Chrome.
      // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
      // 0.001
      // Fallback here: "Not Safari" userAgent

      if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element) {
    var rect = getBoundingClientRect(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;

      if (process.env.NODE_ENV !== "production") {
        console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
      }
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name; // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step

    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis || checkAltAxis) {
      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
      var max$1 = popperOffsets[mainAxis] - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
      var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

      if (checkMainAxis) {
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = rect.width / element.offsetWidth || 1;
    var scaleY = rect.height / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function format(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [].concat(args).reduce(function (p, c) {
      return p.replace(/%s/, c);
    }, str);
  }

  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
  var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
  function validateModifiers(modifiers) {
    modifiers.forEach(function (modifier) {
      [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
      .filter(function (value, index, self) {
        return self.indexOf(value) === index;
      }).forEach(function (key) {
        switch (key) {
          case 'name':
            if (typeof modifier.name !== 'string') {
              console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
            }

            break;

          case 'enabled':
            if (typeof modifier.enabled !== 'boolean') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
            }

            break;

          case 'phase':
            if (modifierPhases.indexOf(modifier.phase) < 0) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
            }

            break;

          case 'fn':
            if (typeof modifier.fn !== 'function') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
            }

            break;

          case 'effect':
            if (modifier.effect != null && typeof modifier.effect !== 'function') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
            }

            break;

          case 'requires':
            if (modifier.requires != null && !Array.isArray(modifier.requires)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
            }

            break;

          case 'requiresIfExists':
            if (!Array.isArray(modifier.requiresIfExists)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
            }

            break;

          case 'options':
          case 'data':
            break;

          default:
            console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
              return "\"" + s + "\"";
            }).join(', ') + "; but \"" + key + "\" was provided.");
        }

        modifier.requires && modifier.requires.forEach(function (requirement) {
          if (modifiers.find(function (mod) {
            return mod.name === requirement;
          }) == null) {
            console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
          }
        });
      });
    });
  }

  function uniqueBy(arr, fn) {
    var identifiers = new Set();
    return arr.filter(function (item) {
      var identifier = fn(item);

      if (!identifiers.has(identifier)) {
        identifiers.add(identifier);
        return true;
      }
    });
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
  var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned
          // if one of the modifiers is invalid for any reason

          if (process.env.NODE_ENV !== "production") {
            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
              var name = _ref.name;
              return name;
            });
            validateModifiers(modifiers);

            if (getBasePlacement(state.options.placement) === auto) {
              var flipModifier = state.orderedModifiers.find(function (_ref2) {
                var name = _ref2.name;
                return name === 'flip';
              });

              if (!flipModifier) {
                console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
              }
            }

            var _getComputedStyle = getComputedStyle$1(popper),
                marginTop = _getComputedStyle.marginTop,
                marginRight = _getComputedStyle.marginRight,
                marginBottom = _getComputedStyle.marginBottom,
                marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
            // cause bugs with positioning, so we'll warn the consumer


            if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
              return parseFloat(margin);
            })) {
              console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
            }
          }

          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            if (process.env.NODE_ENV !== "production") {
              console.error(INVALID_ELEMENT_ERROR);
            }

            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          var __debug_loops__ = 0;

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (process.env.NODE_ENV !== "production") {
              __debug_loops__ += 1;

              if (__debug_loops__ > 100) {
                console.error(INFINITE_LOOP_ERROR);
                break;
              }
            }

            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        if (process.env.NODE_ENV !== "production") {
          console.error(INVALID_ELEMENT_ERROR);
        }

        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  function usePopperApi({
    updating,
    positionInline,
    positionBlock,
    skidding,
    distance,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight
  }) {
    const [popperInstance, setPopperInstance, getPopperInstance] = useState(null);
    const [usedPlacement, setUsedPlacement] = useState(null);
    const resetPopperInstance = useCallback((sourceElement, popperElement) => {
      if (sourceElement && popperElement) {
        const onFirstUpdate = () => {};

        const strategy = "absolute";
        let placement = "auto"; //logicalToPlacement(getLogicalDirection()!, positionInline, positionBlock);

        setPopperInstance(createPopper(sourceElement, popperElement, {
          modifiers: [{
            name: "flip",
            options: {}
          }, {
            name: "preventOverflow",
            options: {
              padding: {
                bottom: paddingBottom !== null && paddingBottom !== void 0 ? paddingBottom : 0,
                top: paddingTop !== null && paddingTop !== void 0 ? paddingTop : 0,
                left: paddingLeft !== null && paddingLeft !== void 0 ? paddingLeft : 0,
                right: paddingRight !== null && paddingRight !== void 0 ? paddingRight : 0
              }
            }
          }, updateStateModifier, {
            name: 'eventListeners',
            enabled: false
          }, {
            name: "applyStyles",
            enabled: false
          }],
          onFirstUpdate,
          placement,
          strategy
        }));
      }
    }, [positionInline, positionBlock, skidding, distance, paddingTop, paddingBottom, paddingLeft, paddingRight]);
    const {
      getElement: getSourceElement,
      useRefElementProps: useSourceElementRefProps
    } = useRefElement({
      onElementChange: e => resetPopperInstance(e, getPopperElement())
    });
    const {
      getElement: getPopperElement,
      useRefElementProps: usePopperElementRefProps
    } = useRefElement({
      onElementChange: e => resetPopperInstance(getSourceElement(), e)
    });
    const {
      getElement: getArrowElement,
      useRefElementProps: useArrowElementRefProps
    } = useRefElement({});
    const [sourceStyle, setSourceStyle] = useState(null);
    const [sourceAttributes, setSourceAttributes] = useState({});
    const [popperStyle, setPopperStyle] = useState(null);
    const [popperAttributes, setPopperAttributes] = useState({});
    const [arrowStyle, setArrowStyle] = useState(null);
    const [arrowAttributes, setArrowAttributes] = useState({});
    useEffect$1(() => {
      if (updating) {
        let rafHandle = 0;

        function raf() {
          var _ref, _getPopperInstance;

          let p = (_ref = closed ? Promise.resolve() : (_getPopperInstance = getPopperInstance()) === null || _getPopperInstance === void 0 ? void 0 : _getPopperInstance.update()) !== null && _ref !== void 0 ? _ref : Promise.resolve();
          p.then(_ => {
            if (rafHandle != 0) {
              rafHandle = requestAnimationFrame(raf);
            }
          });
        }

        rafHandle = requestAnimationFrame(raf);
        return () => {
          cancelAnimationFrame(rafHandle); // Single-threaded languages are nice sometimes.

          rafHandle = 0;
        };
      }
    }, [updating]);
    const updateStateModifier = useMemo(() => {
      let modifier = {
        name: "updateState",
        enabled: true,
        phase: "write",
        fn: ({
          state,
          options,
          name,
          instance
        }) => {
          let usedPlacement = state.placement;
          if (usedPlacement.includes("-")) usedPlacement = usedPlacement.substr(0, usedPlacement.indexOf("-"));
          setUsedPlacement(usedPlacement);
          if (state.styles.reference) setSourceStyle(state.styles.reference);
          if (state.attributes.reference) setSourceAttributes(state.attributes.reference);
          if (state.styles.popper) setPopperStyle(state.styles.popper);
          if (state.attributes.popper) setPopperAttributes(state.attributes.popper);
          if (state.styles.arrow) setArrowStyle(state.styles.arrow);
          if (state.attributes.arrow) setArrowAttributes(state.attributes.arrow);
        },
        requires: ["computeStyles", "flip"]
      };
      return modifier;
    }, []);
    const [logicalDirection, setLogicalDirection] = useState(null);
    const {
      convertElementSize,
      getLogicalDirectionInfo,
      useLogicalDirectionProps
    } = useLogicalDirection({
      onLogicalDirectionChange: setLogicalDirection
    });

    function usePopperSource() {
      function usePopperSourceProps(props) {
        let style = { ...sourceStyle
        };
        return useSourceElementRefProps(useMergedProps()(sourceAttributes, useMergedProps()({
          style
        }, useLogicalDirectionProps(props))));
      }

      return {
        usePopperSourceProps
      };
    }

    function usePopperPopup({
      open
    }) {
      function usePopperPopupProps(props) {
        let style = { ...popperStyle,
          pointerEvents: open ? undefined : "none"
        };
        return usePopperElementRefProps(useMergedProps()({
          style
        }, props));
      }

      return {
        usePopperPopupProps
      };
    }

    function usePopperArrow() {
      function usePopperArrowProps(props) {
        let style = { ...arrowStyle
        };
        return useMergedProps()(popperAttributes, useMergedProps()({
          style
        }, useArrowElementRefProps(props)));
      }

      return {
        usePopperArrowProps
      };
    }

    return {
      usePopperSource,
      usePopperPopup,
      usePopperArrow,
      usedPlacement,
      logicalDirection
    };
  }
  function placementToLogical(logicalDirection, placement) {
    const {
      blockDirection,
      blockOrientation,
      inlineDirection,
      inlineOrientation
    } = logicalDirection;
    let logical;

    switch (`${inlineDirection}-${blockDirection},${placement}`) {
      // There's a pattern, and it could be coded as a pattern
      case "ltr-ttb,top":
        logical = "block-start";
        break;

      case "ltr-btt,bottom":
        logical = "block-start";
        break;

      case "rtl-ttb,top":
        logical = "block-start";
        break;

      case "rtl-btt,bottom":
        logical = "block-start";
        break;

      case "ttb-ltr,left":
        logical = "block-start";
        break;

      case "btt-ltr,right":
        logical = "block-start";
        break;

      case "ttb-rtl,left":
        logical = "block-start";
        break;

      case "btt-rtl,right":
        logical = "block-start";
        break;

      case "ltr-ttb,bottom":
        logical = "block-end";
        break;

      case "rtl-ttb,bottom":
        logical = "block-end";
        break;

      case "ltr-btt,top":
        logical = "block-end";
        break;

      case "rtl-btt,top":
        logical = "block-end";
        break;

      case "ttb-ltr,right":
        logical = "block-end";
        break;

      case "ttb-rtl,right":
        logical = "block-end";
        break;

      case "btt-ltr,left":
        logical = "block-end";
        break;

      case "btt-rtl,left":
        logical = "block-end";
        break;

      case "ttb-ltr,top":
        logical = "inline-start";
        break;

      case "ttb-rtl,top":
        logical = "inline-start";
        break;

      case "btt-ltr,bottom":
        logical = "inline-start";
        break;

      case "btt-rtl,bottom":
        logical = "inline-start";
        break;

      case "ltr-ttb,left":
        logical = "inline-start";
        break;

      case "rtl-ttb,left":
        logical = "inline-start";
        break;

      case "ltr-btt,right":
        logical = "inline-start";
        break;

      case "rtl-btt,right":
        logical = "inline-start";
        break;

      case "ttb-ltr,bottom":
        logical = "inline-end";
        break;

      case "ttb-rtl,bottom":
        logical = "inline-end";
        break;

      case "btt-ltr,top":
        logical = "inline-end";
        break;

      case "btt-rtl,top":
        logical = "inline-end";
        break;

      case "ltr-ttb,right":
        logical = "inline-end";
        break;

      case "rtl-ttb,right":
        logical = "inline-end";
        break;

      case "ltr-btt,left":
        logical = "inline-end";
        break;

      case "rtl-btt,left":
        logical = "inline-end";
        break;
      // Shouldn't happen, but here for type correctness.

      case "ttb-ttb,bottom":
      case "ttb-ttb,top":
      case "btt-btt,bottom":
      case "btt-btt,top":
      case "ltr-ltr,bottom":
      case "ltr-ltr,top":
      case "rtl-rtl,bottom":
      case "rtl-rtl,top":
      case "ttb-btt,bottom":
      case "btt-ttb,top":
      case "btt-ttb,bottom":
      case "ttb-btt,top":
      case "ltr-rtl,bottom":
      case "rtl-ltr,top":
      case "rtl-ltr,bottom":
      case "ltr-rtl,top":
      case "ttb-ttb,right":
      case "ttb-ttb,left":
      case "btt-btt,right":
      case "btt-btt,left":
      case "ltr-ltr,right":
      case "ltr-ltr,left":
      case "rtl-rtl,right":
      case "rtl-rtl,left":
      case "ttb-btt,right":
      case "btt-ttb,left":
      case "btt-ttb,right":
      case "ttb-btt,left":
      case "ltr-rtl,right":
      case "rtl-ltr,left":
      case "rtl-ltr,right":
      case "ltr-rtl,left":
        debugger;
        logical = logical;
        break;
    }

    return logical;
  }
  function useShouldUpdatePopper(open) {
    // Since scroll events are asynchronous, especially on iOS devices,
    // just manually adjust the position of the popper for a bit
    // any time basically any user interaction happens.
    const [updatingForABit, setUpdatingForABit] = useState(0);
    useTimeout({
      callback: () => {
        setUpdatingForABit(0);
      },
      timeout: 100,
      triggerIndex: updatingForABit
    });
    let onInteraction = useCallback(() => {
      setUpdatingForABit(u => ++u);
    }, [closed]);
    if (!open) onInteraction = null;
    useGlobalHandler(document, "keydown", onInteraction, {
      passive: true,
      capture: true
    });
    useGlobalHandler(window, "click", onInteraction, {
      passive: true,
      capture: true
    });
    useGlobalHandler(window, "scroll", open ? onInteraction : null, {
      passive: true,
      capture: true
    });
    useGlobalHandler(window, "pointermove", open ? onInteraction : null, {
      passive: true,
      capture: true
    });
    useGlobalHandler(window, "resize", open ? onInteraction : null, {
      passive: true,
      capture: true
    });
    return {
      shouldUpdate: !!updatingForABit,
      onInteraction
    };
  }
  /**
   * Handle the e.g. zoomOriginDynamic props, to turn them into zoomOriginInline or zoomOriginBlock as appropriate.
   * TODO: Right now, all *Dynamic props are just handled as 1 - prop. Some probably need to be -1 * prop though.
   */

  function fixProps(logicalDirection, requestedPlacement, usedPlacement, props) {
    let logicalSnake = placementToLogical(logicalDirection, usedPlacement);
    let propAxis;
    let reverse;

    switch (logicalSnake) {
      case "block-start":
        propAxis = "Block";
        reverse = requestedPlacement == "block-end";
        break;

      case "block-end":
        propAxis = "Block";
        reverse = requestedPlacement == "block-start";
        break;

      case "inline-start":
        propAxis = "Inline";
        reverse = requestedPlacement == "inline-end";
        break;

      case "inline-end":
        propAxis = "Inline";
        reverse = requestedPlacement == "inline-start";
        break;
    }

    let newProps = { ...props
    };

    for (let propName in props) {
      if (propName.endsWith("Dynamic") && typeof props[propName] === "number") {
        let newPropName = `${propName.substr(0, propName.indexOf("Dynamic"))}${propAxis}`;
        newProps[newPropName] = !reverse ? newProps[propName] : 1 - newProps[propName];
        delete newProps[propName];
      }
    }

    return newProps;
  }

  const OnCloseContext = createContext(undefined);
  const UseMenuItemContext = createContext(null);
  function Menu({
    anchor,
    anchorEventName,
    anchorTag,
    children,
    tag,
    positionInline,
    positionBlock,
    Transition,
    ...rest
  }) {
    useLogRender("Menu", `Rendering Menu`);
    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => setOpen(false), []);

    const onOpen = () => setOpen(true);

    const {
      shouldUpdate: updatingForABit,
      onInteraction
    } = useShouldUpdatePopper(open);
    const {
      useElementSizeProps
    } = useElementSize({
      onSizeChange: onInteraction !== null && onInteraction !== void 0 ? onInteraction : () => {}
    });
    const {
      useHasFocusProps,
      getFocusedInner: getMenuHasFocusInner
    } = useHasFocus({});
    const {
      usePopperArrow,
      usePopperPopup,
      usePopperSource,
      usedPlacement,
      logicalDirection
    } = usePopperApi({
      positionInline: positionInline !== null && positionInline !== void 0 ? positionInline : "start",
      positionBlock: positionBlock !== null && positionBlock !== void 0 ? positionBlock : "end",
      updating: updatingForABit
    });
    const {
      useMenuButton,
      useMenuItem,
      useMenuProps,
      useMenuSubmenuItem,
      focusMenu
    } = useAriaMenu({
      shouldFocusOnChange: getMenuHasFocusInner,
      open,
      onClose,
      onOpen
    });
    const {
      useMenuButtonProps
    } = useMenuButton({
      tag: anchorTag !== null && anchorTag !== void 0 ? anchorTag : "button"
    });
    const {
      usePopperSourceProps
    } = usePopperSource();
    const {
      usePopperPopupProps
    } = usePopperPopup({
      open
    });
    const {
      usePopperArrowProps
    } = usePopperArrow();
    /*const [sentinelFocused, setSentinelFocused] = useState(false);
    useTimeout({ callback: () => { if (sentinelFocused) onClose(); setSentinelFocused(false); }, timeout: 1000, triggerIndex: sentinelFocused.toString() })*/

    const [firstSentinelIsActive, setFirstSentinelIsActive] = useState(false);
    useTimeout({
      callback: () => {
        setFirstSentinelIsActive(open);
      },
      timeout: 100,
      triggerIndex: `${firstSentinelIsActive}`
    });

    if (Transition == undefined) {
      Transition = ZoomFade;
      rest.zoomOriginDynamic = 0;
      rest.zoomMin = 0.85;
    }

    if (logicalDirection && usedPlacement) rest = fixProps(logicalDirection, "block-end", usedPlacement, rest);

    const onAnchorClick = () => setOpen(open => !open);

    return createElement(Fragment, null, createElement(OnCloseContext.Provider, {
      value: onClose
    }, createElement(UseMenuItemContext.Provider, {
      value: useMenuItem
    }, cloneElement(anchor, useMergedProps()({
      [anchorEventName !== null && anchorEventName !== void 0 ? anchorEventName : "onPress"]: onAnchorClick,
      ref: anchor.ref,
      class: `${open ? "active" : ""}`
    }, useElementSizeProps(usePopperSourceProps(useMenuButtonProps(anchor.props))))), createElement(BodyPortal, null, createElement("div", { ...usePopperPopupProps({
        class: "dropdown-menu-popper"
      })
    }, createElement(Transition, { ...useMenuProps(rest),
      show: open,
      onTransitionUpdate: onInteraction,
      exitVisibility: "hidden"
    }, createElement("div", { ...useHasFocusProps({})
    }, createElement("div", { ...usePopperArrowProps({})
    }), createElement("button", {
      className: "visually-hidden",
      onFocus: !firstSentinelIsActive ? () => focusMenu === null || focusMenu === void 0 ? void 0 : focusMenu() : () => onClose(),
      onClick: onClose
    }, "Close menu"), createElement(tag !== null && tag !== void 0 ? tag : "ul", {
      children,
      className: "dropdown-menu elevation-raised-4 elevation-body-surface"
    }), createElement("button", {
      className: "visually-hidden",
      onFocus: onClose,
      onClick: onClose
    }, "Close menu"))))))));
  }
  function MenuItem({
    children,
    disabled,
    onPress: onPressAsync,
    index,
    ...rest
  }) {
    useLogRender("MenuItem", `Rendering MenuItem`);
    const useMenuItem = useContext(UseMenuItemContext);
    const isInteractive = onPressAsync != null;
    const [text, setText] = useState(null);
    const {
      useRefElementProps,
      getElement
    } = useRefElement({});
    useMutationObserver(getElement, {
      subtree: true,
      onCharacterData: info => {
        var _getElement$innerText, _getElement;

        return setText((_getElement$innerText = (_getElement = getElement()) === null || _getElement === void 0 ? void 0 : _getElement.innerText) !== null && _getElement$innerText !== void 0 ? _getElement$innerText : "");
      }
    });
    const {
      useMenuItemProps
    } = useMenuItem({
      index,
      text
    });
    const onClose = useContext(OnCloseContext);
    const {
      getSyncHandler,
      pending,
      settleCount,
      hasError
    } = useAsyncHandler()({
      capture: useCallback(() => {
        return undefined;
      }, [])
    });
    disabled || (disabled = pending);
    const onPress = getSyncHandler(disabled || !onPressAsync ? null : () => {
      var _onPressAsync;

      return onPressAsync === null || onPressAsync === void 0 ? void 0 : (_onPressAsync = onPressAsync()) === null || _onPressAsync === void 0 ? void 0 : _onPressAsync.then(() => onClose === null || onClose === void 0 ? void 0 : onClose());
    });
    const newProps = useMenuItemProps(useRefElementProps(useMergedProps()(rest, {
      class: clsx(onPressAsync ? "dropdown-item" : "dropdown-item-text", disabled && "disabled"),
      "aria-disabled": disabled ? "true" : undefined
    })));
    const buttonProps = usePseudoActive(useButtonLikeEventHandlers(disabled ? null : onPress, undefined)(newProps));

    if (isInteractive) {
      return createElement("li", null, createElement(ProgressCircular, {
        mode: hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null,
        childrenPosition: "child",
        colorFill: "foreground-only",
        colorVariant: "info"
      }, createElement("button", { ...buttonProps
      }, children)));
    } else {
      return createElement("li", { ...newProps
      }, children);
    }
  }

  const UseTabContext = createContext(null);
  const UseTabPanelContext = createContext(null);
  const Tabs = memo(forwardElementRef(function Tabs({
    onSelect: onSelectAsync,
    orientation,
    selectedIndex,
    selectionMode,
    children,
    visualVariant,
    ...props
  }, ref) {
    var _orientation;

    const capture = e => {
      return e[EventDetail].selectedIndex;
    };

    (_orientation = orientation) !== null && _orientation !== void 0 ? _orientation : orientation = "inline";
    const {
      getSyncHandler
    } = useAsyncHandler()({
      capture: capture
    });
    const onSelect = getSyncHandler(onSelectAsync);
    const {
      useTab,
      useTabPanel,
      useTabsLabel,
      useTabsList
    } = useAriaTabs({
      onSelect,
      selectedIndex,
      selectionMode,
      orientation
    });
    const {
      useTabListProps
    } = useTabsList();
    return createElement("div", {
      class: clsx("tabs-container", `tabs-orientation-${orientation}`)
    }, createElement(UseTabContext.Provider, {
      value: useTab
    }, cloneElement(children[0], useTabListProps({
      className: clsx("nav", visualVariant == "pills" ? "nav-pills" : "nav-tabs")
    }), children[0].props.children)), createElement(UseTabPanelContext.Provider, {
      value: useTabPanel
    }, createElement(Swappable, null, createElement("div", { ...useMergedProps()({
        className: "tab-content elevation-depressed-3 elevation-body-surface"
      }, { ...props,
        ref
      })
    }, ...children.slice(1)))));
  }));
  const Tab = memo(forwardElementRef(function Tab({
    index,
    children,
    ...props
  }, ref) {
    const useTabContext = useContext(UseTabContext);
    const {
      useTabProps,
      selected
    } = useTabContext({
      index,
      text: null,
      tag: "button"
    });
    return createElement("li", {
      className: "nav-item",
      role: "presentation"
    }, createElement("button", { ...useTabProps(useMergedProps()({
        ref,
        class: clsx(`nav-link`, selected && `active`)
      }, props))
    }, children));
  }));
  const TabPanel = memo(forwardElementRef(function TabPanel({
    index,
    children,
    Transition,
    ...rest
  }, ref) {
    const useTabPanel = useContext(UseTabPanelContext);
    const {
      useTabPanelProps,
      visible
    } = useTabPanel({
      index
    });
    return createElement(Transition, useTabPanelProps({
      ref,
      show: visible,
      children,
      ...rest
    }));
  }));

  const PushToastContext = createContext(null);
  const UpdateToastContext = createContext(null);
  const DefaultToastTimeout = createContext(5000);
  function ToastsProvider({
    children,
    defaultTimeout
  }) {
    const [pushToast, setPushToast] = useState(null);
    const [updateToast, setUpdateToast] = useState(null);
    const pushToastStable = useStableCallback(toast => {
      var _pushToast;

      return (_pushToast = pushToast === null || pushToast === void 0 ? void 0 : pushToast(toast)) !== null && _pushToast !== void 0 ? _pushToast : -1;
    });
    const updateToastStable = useStableCallback((index, toast) => {
      return updateToast === null || updateToast === void 0 ? void 0 : updateToast(index, toast);
    });
    return createElement(Fragment, null, createElement(DefaultToastTimeout.Provider, {
      value: defaultTimeout !== null && defaultTimeout !== void 0 ? defaultTimeout : 5000
    }, createElement(ToastsProviderHelper, {
      setPushToast: setPushToast,
      setUpdateToast: setUpdateToast
    }), pushToast && updateToast && createElement(PushToastContext.Provider, {
      value: pushToastStable
    }, createElement(UpdateToastContext.Provider, {
      value: updateToastStable
    }, children))));
  }
  function usePushToast() {
    const pushToast = useContext(PushToastContext);
    return pushToast;
  }

  function ToastsProviderHelper({
    setPushToast,
    setUpdateToast
  }) {
    const [children, setChildren, getChildren] = useState([]);
    const pushToast = useCallback(toast => {
      const randomKey = generateRandomId();
      let index = getChildren().length;
      setChildren(prev => [...prev, cloneElement(toast, {
        key: randomKey
      })]);
      return index;
    }, []);
    const updateToast = useCallback((index, toast) => {
      var _getChildren$index;

      const key = (_getChildren$index = getChildren()[index]) === null || _getChildren$index === void 0 ? void 0 : _getChildren$index.key;
      console.assert(key);

      if (key) {
        setChildren(prev => {
          let newChildren = prev.slice();
          newChildren.splice(index, 1, cloneElement(toast, {
            key: key
          }));
          return newChildren;
        });
        return index;
      }
    }, []);
    useLayoutEffect$1(() => {
      setPushToast(_ => pushToast);
    }, [pushToast]);
    useLayoutEffect$1(() => {
      setUpdateToast(_ => updateToast);
    }, [updateToast]);
    return createElement(BodyPortal, null, createElement(ToastsContainerChildrenContext.Provider, {
      value: children
    }, createElement(ToastsContainer, null)));
  }

  const ToastsContainerChildrenContext = createContext([]);
  const UseToastContext = createContext(null);

  function ToastsContainer(props) {
    const children = useContext(ToastsContainerChildrenContext);
    const {
      useToast,
      useToastContainerProps
    } = useToasts(props);
    const [theme, setTheme] = useState(oppositeTheme(document.documentElement.classList));
    useMutationObserver(() => document.documentElement, {
      attributeFilter: ["class"],
      onAttributes: ({
        attributeName
      }) => {
        if (attributeName === "class") {
          setTheme(oppositeTheme(document.documentElement.classList));
        }
      }
    });
    return createElement(UseToastContext.Provider, {
      value: useToast
    }, createElement("div", { ...useToastContainerProps(useMergedProps()({
        className: `set-theme ${theme}`
      }, props))
    }, children));
  }

  function oppositeTheme(classList) {
    if (document.documentElement.classList.contains("theme-dark")) return "theme-light";else if (document.documentElement.classList.contains("theme-light")) return "theme-dark";else return "";
  }

  const ToastDismissContext = createContext(null);
  function Toast({
    timeout,
    politeness,
    children
  }) {
    const useToast = useContext(UseToastContext);
    const defaultTimeout = useContext(DefaultToastTimeout);
    const {
      useToastProps,
      dismiss,
      status
    } = useToast({
      timeout: timeout !== null && timeout !== void 0 ? timeout : defaultTimeout,
      politeness
    });
    const show = status != "dismissed";
    return createElement(ToastDismissContext.Provider, {
      value: dismiss
    }, createElement(SlideFade, {
      show: show,
      slideTargetInline: 1,
      animateOnMount: show,
      exitVisibility: "removed"
    }, createElement("div", { ...useToastProps({
        class: "toast show"
      })
    }, createElement("div", {
      class: "d-flex"
    }, createElement("div", {
      class: "toast-body"
    }, children), createElement(Button, {
      class: "btn-close me-2 m-auto",
      "aria-label": "Dismiss alert",
      onPress: dismiss
    })))));
  }
  /*
  export function ToastHeader({ children }: { children: ComponentChildren }) {
      return (
          <div class="toast-header">
              <div class="me-auto">
                  {children}
              </div>
              <Button class="btn-close" aria-label="Close" />
          </div>
      )
  }*/

  function Tooltip({
    children,
    positionInline,
    positionBlock,
    tooltip,
    Transition,
    mouseoverDelay,
    ...rest
  }) {
    const {
      getIsOpen,
      isOpen,
      useTooltip,
      useTooltipTrigger
    } = useAriaTooltip({
      mouseoverDelay
    });
    let cloneable;

    if (typeof children === "string" || typeof children === "number" || typeof children == "boolean" || typeof children === "bigint") {
      cloneable = createElement("span", null, children);
    } else if (Array.isArray(children)) {
      cloneable = createElement("span", null, children);
    } else {
      cloneable = children;
    }

    const {
      useTooltipProps
    } = useTooltip();
    const {
      useTooltipTriggerProps
    } = useTooltipTrigger();
    const {
      shouldUpdate,
      onInteraction
    } = useShouldUpdatePopper(isOpen);
    const {
      useElementSizeProps
    } = useElementSize({
      onSizeChange: onInteraction !== null && onInteraction !== void 0 ? onInteraction : () => {}
    });
    const {
      logicalDirection,
      usePopperArrow,
      usePopperPopup,
      usePopperSource,
      usedPlacement
    } = usePopperApi({
      updating: shouldUpdate,
      positionInline: positionInline !== null && positionInline !== void 0 ? positionInline : "start",
      positionBlock: positionBlock !== null && positionBlock !== void 0 ? positionBlock : "end"
    });
    const {
      usePopperPopupProps
    } = usePopperPopup({
      open: isOpen
    });
    const {
      usePopperArrowProps
    } = usePopperArrow();
    const {
      usePopperSourceProps
    } = usePopperSource();
    if (logicalDirection && usedPlacement) rest = fixProps(logicalDirection, "block-end", usedPlacement, rest);

    if (Transition == undefined) {
      Transition = ZoomFade;
      rest.zoomOriginDynamic = 0;
      rest.zoomMin = 0.85;
    } // TODO: It's required for this to be exitVisibility="hidden" for transforms to work?
    // Probably an issue in the Transition element itself because it's not browser-specific but it's a little weird


    return createElement(Fragment, null, cloneElement(cloneable, useMergedProps()({
      ref: cloneable.ref
    }, useTooltipTriggerProps(useElementSizeProps(usePopperSourceProps(cloneable.props))))), createElement(BodyPortal, null, createElement("div", { ...usePopperPopupProps({
        class: "tooltip-wrapper"
      })
    }, createElement(Transition, { ...rest,
      show: isOpen,
      onTransitionUpdate: onInteraction,
      exitVisibility: "hidden"
    }, createElement("div", { ...useTooltipProps(useMergedProps()({
        class: "tooltip show",
        role: "tooltip"
      }, {}))
    }, createElement("div", { ...usePopperArrowProps({
        class: "tooltip-arrow"
      })
    }), createElement("div", {
      class: "tooltip-inner"
    }, tooltip))))));
  }

  const Card = memo(forwardElementRef(function Card(p, ref) {
    let {
      children,
      ...props
    } = p;
    return createElement("div", { ...useMergedProps()({
        ref,
        className: "card elevation-raised-1 elevation-body-surface"
      }, props)
    }, children);
  }));

  function CardElement2({
    children,
    ...p
  }, ref) {
    switch (p.type) {
      default:
      case "paragraph":
        {
          const {
            type,
            ...props
          } = p;
          return createElement(CardBody, { ...props,
            ref: ref
          }, createElement(CardText, null, children));
        }

      case "footer":
        {
          const {
            type,
            ...props
          } = p;
          return createElement(CardFooter, { ...props,
            ref: ref
          }, children);
        }

      case "subtitle":
        {
          const {
            type,
            tag,
            ...props
          } = p;
          return createElement(CardSubtitle, {
            tag: tag,
            ...useMergedProps()({
              className: "card-body"
            }, props),
            ref: ref
          }, children);
        }

      case "title":
        {
          const {
            type,
            tag,
            ...props
          } = p;
          return createElement(CardTitle, {
            tag: tag,
            ...useMergedProps()({
              className: "card-body"
            }, props),
            ref: ref
          }, children);
        }

      case "image":
        {
          const {
            type,
            src,
            ...props
          } = p;
          return createElement(CardImage, {
            src: src,
            position: "both",
            ...props,
            ref: ref
          }, children);
        }

      case "flush":
        {
          const {
            tag,
            ...props
          } = p;
          return createElement(tag, props, children);
        }
    }
  }

  const CardElement = memo(forwardElementRef(CardElement2));
  const CardImage = memo(forwardElementRef(function CardImage(p, ref) {
    const {
      position,
      ...props
    } = p;
    return createElement("img", { ...useMergedProps()(props, {
        ref,
        className: `card-img${position == "both" ? "" : `-${position}`}`
      })
    });
  }));
  const CardBody = memo(forwardElementRef(function CardBody(props, ref) {
    return createElement("div", { ...useMergedProps()(props, {
        ref,
        className: "card-body"
      })
    });
  }));
  const CardFooter = memo(forwardElementRef(function CardHeader(props, ref) {
    return createElement("div", { ...useMergedProps()(props, {
        ref,
        className: "card"
      })
    });
  }));
  const CardTitle = memo(forwardElementRef(function CardTitle(p, ref) {
    const {
      tag,
      ...props
    } = p;
    return createElement(tag !== null && tag !== void 0 ? tag : "h5", useMergedProps()(props, {
      ref,
      className: "card-title"
    }));
  }));
  const CardSubtitle = memo(forwardElementRef(function CardSubtitle(p, ref) {
    const {
      tag,
      ...props
    } = p;
    return createElement(tag !== null && tag !== void 0 ? tag : "h5", useMergedProps()(props, {
      ref,
      className: clsx("card-subtitle", "mb-2", "text-muted")
    }));
  }));
  const CardText = memo(forwardElementRef(function CardText(props, ref) {
    return createElement("div", { ...useMergedProps()(props, {
        ref,
        className: "card-text"
      })
    });
  }));
  memo(forwardElementRef(function CardHeader(props, ref) {
    return createElement("div", { ...useMergedProps()(props, {
        ref,
        className: "card-header"
      })
    });
  }));

  function DemoButtons() {
      const [buttonsFill, setButtonsFill] = useState("outline");
      const [buttonsSize, setButtonsSize] = useState("md");
      const [buttonsColor, setButtonsColor] = useState("primary");
      const [toggleOn, setToggleOn] = useState(false);
      const [asyncTimeout, setAsyncTimeout] = useState(3000);
      const [usesAsync, setUsesAsync] = useState(true);
      const [asyncFails, setAsyncFails] = useState(false);
      const [usesLinkButton, setUsesLinkButton] = useState(true);
      const pushToast = usePushToast();
      const onPressSync = () => void (pushToast(createElement(Toast, null, "Button was clicked")));
      const onPressAsync = async () => {
          await sleep$5(asyncTimeout);
          if (asyncFails)
              throw new Error("Button operation failed.");
          else
              onPressSync();
      };
      const onPress = usesAsync ? onPressAsync : onPressSync;
      const onToggleInputAsync = async (b) => {
          await sleep$5(asyncTimeout);
          if (asyncFails)
              throw new Error("Button operation failed.");
          else
              setToggleOn(b);
      };
      const onToggleInput = usesAsync ? onToggleInputAsync : setToggleOn;
      return (createElement(ProvideDefaultButtonFill, { value: buttonsFill },
          createElement(ProvideDefaultButtonSize, { value: buttonsSize },
              createElement(ProvideDefaultButtonColor, { value: buttonsColor },
                  createElement("div", { class: "demo" },
                      createElement(Card, null,
                          createElement(CardElement, { type: "title", tag: "h2" }, "Buttons"),
                          createElement(CardElement, null,
                              createElement(Button, { onPress: onPress }, "I'm a button")),
                          createElement(CardElement, null,
                              "A ",
                              createElement("code", null, "Button"),
                              " is a ",
                              createElement("code", null, "Button"),
                              " is a ",
                              createElement("code", null, "Button"),
                              " \u2013 you can click, tap, or Space-key it to activate it and do something.  If the given action is asynchronous, then the button will disable itself and display a spinner during the operation."),
                          createElement(CardElement, { type: "subtitle", tag: "h3" }, "Async inputs"),
                          createElement(CardElement, null,
                              "The ",
                              createElement("code", null, "onPress"),
                              " event handler for buttons can be sync or async, and they will react appropriately if the operation takes long enough.",
                              createElement(InputGrid, null,
                                  createElement(InputGroup, null,
                                      createElement(Checkbox, { onCheck: setUsesAsync, checked: usesAsync, labelPosition: "start" }, "Use async handler")),
                                  createElement(InputGroup, null,
                                      createElement(Checkbox, { onCheck: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync }, "Async handler rejects")),
                                  createElement(InputGroup, null,
                                      createElement(Input, { width: "8ch", disabled: !usesAsync, type: "number", onValueChange: setAsyncTimeout, value: asyncTimeout }, "Async timeout")))),
                          createElement(CardElement, null,
                              createElement(Button, { onPress: onPress }, "Click me")),
                          createElement(CardElement, { type: "paragraph" },
                              createElement("code", null, `const onPress = ${usesAsync ? `async ` : ""}() => { ${usesAsync ? `await sleep(${asyncTimeout}); ` : ""}pushToast(<Toast ... />); }
<Button onPress={onPress}>Click me</Button>`)),
                          createElement("hr", null),
                          createElement(CardElement, { type: "subtitle", tag: "h3" }, "Color & fill"),
                          createElement(CardElement, { type: "paragraph" },
                              "Buttons can be styled in different colors and fill styles. You can provide a global default with ",
                              createElement("code", null, "Context"),
                              " objects, like ",
                              createElement("code", null, "<ProvideDefaultButtonFill>"),
                              "."),
                          createElement(CardElement, null,
                              "All outline styles have extra CSS applied to make them have correct contrast ratios on the default body background, partially because toggle buttons don't allow their ",
                              createElement("code", null, "fill"),
                              " to be controlled."),
                          createElement(CardElement, null,
                              createElement(ButtonGroup, null,
                                  createElement(ButtonGroupChild, { index: 0, onPressToggle: () => setButtonsFill("fill"), pressed: buttonsFill === "fill" }, "Fill"),
                                  createElement(ButtonGroupChild, { index: 1, onPressToggle: () => setButtonsFill("outline"), pressed: buttonsFill === "outline" }, "Outline"))),
                          createElement(CardElement, null,
                              createElement(ButtonGroup, { wrap: true },
                                  createElement(ButtonGroupChild, { index: 0, colorVariant: "primary", pressed: buttonsColor == "primary", onPressToggle: () => setButtonsColor("primary") }, "Primary"),
                                  createElement(ButtonGroupChild, { index: 1, colorVariant: "secondary", pressed: buttonsColor == "secondary", onPressToggle: () => setButtonsColor("secondary") }, "Secondary"),
                                  createElement(ButtonGroupChild, { index: 2, colorVariant: "success", pressed: buttonsColor == "success", onPressToggle: () => setButtonsColor("success") }, "Success"),
                                  createElement(ButtonGroupChild, { index: 3, colorVariant: "warning", pressed: buttonsColor == "warning", onPressToggle: () => setButtonsColor("warning") }, "Warning"),
                                  createElement(ButtonGroupChild, { index: 4, colorVariant: "danger", pressed: buttonsColor == "danger", onPressToggle: () => setButtonsColor("danger") }, "Danger"),
                                  createElement(ButtonGroupChild, { index: 5, colorVariant: "info", pressed: buttonsColor == "info", onPressToggle: () => setButtonsColor("info") }, "Info"),
                                  createElement(ButtonGroupChild, { index: 6, colorVariant: "light", pressed: buttonsColor == "light", onPressToggle: () => setButtonsColor("light") }, "Light"),
                                  createElement(ButtonGroupChild, { index: 7, colorVariant: "dark", pressed: buttonsColor == "dark", onPressToggle: () => setButtonsColor("dark") }, "Dark"),
                                  createElement(ButtonGroupChild, { index: 8, colorVariant: "contrast", pressed: buttonsColor == "contrast", onPressToggle: () => setButtonsColor("contrast") }, "Contrast"),
                                  createElement(ButtonGroupChild, { index: 9, colorVariant: "subtle", pressed: buttonsColor == "subtle", onPressToggle: () => setButtonsColor("subtle") }, "Subtle"))),
                          createElement(CardElement, null,
                              createElement(Button, { onPress: onPress },
                                  buttonsFill === "fill" ? "Filled" : "Outlined",
                                  " ",
                                  buttonsColor,
                                  " button")),
                          createElement(CardElement, null,
                              createElement("code", null, `<Button fillVariant="${buttonsFill}" colorVariant="${buttonsColor}">Variant button</Button>`)),
                          createElement("hr", null),
                          createElement(CardElement, { type: "subtitle", tag: "h3" }, "Link buttons"),
                          createElement(CardElement, null,
                              "A link can be styled as a button while retaining native link functionality (middle clicks, etc.). These buttons have no ",
                              createElement("code", null, "onPress"),
                              " handler, instead taking ",
                              createElement("code", null, "href"),
                              " and the other ",
                              createElement("code", null, "<a>"),
                              " props."),
                          createElement(CardElement, null,
                              "A ",
                              createElement("code", null, "<Button>"),
                              " will use an anchor link internally if you provide it with an ",
                              createElement("code", null, "href"),
                              " prop, or optionally setting the ",
                              createElement("code", null, "tag"),
                              " prop to ",
                              createElement("code", null, "a"),
                              ".",
                              createElement(InputGroup, null,
                                  createElement(Checkbox, { onCheck: setUsesLinkButton, checked: usesLinkButton, labelPosition: "start" }, "Use link button"))),
                          createElement(CardElement, null, usesLinkButton ? createElement(Button, { target: "_blank", href: "https://www.example.com" },
                              "example.com ",
                              createElement("i", { class: "bi bi-box-arrow-up-right" })) : createElement(Button, { onPress: onPress }, "Regular button")),
                          createElement(CardElement, { type: "paragraph" },
                              createElement("code", null, usesLinkButton ? `<Button href="https://www.example.com">Link button</Button>` : `<Button onPress={onPress}>Regular button</Button>`)),
                          createElement("hr", null),
                          createElement(CardElement, { type: "subtitle", tag: "h3" }, "Toggle buttons"),
                          createElement(CardElement, null,
                              "If given a ",
                              createElement("code", null, "pressed"),
                              " prop, a button will become a toggle button, with an off/on state.  It will style itself as outlined when unpressed, and filled when pressed, so they are best used in groups."),
                          createElement(CardElement, null,
                              createElement(Button, { pressed: toggleOn, onPressToggle: onToggleInput }, "Toggle button")),
                          createElement(CardElement, { type: "paragraph" },
                              createElement("code", null, `<Button pressed={pressed} onInput={onInput}>Toggle button</Button>`)),
                          createElement("hr", null),
                          createElement(CardElement, { type: "subtitle", tag: "h3" }, "Button Groups"),
                          createElement(CardElement, null,
                              "A ",
                              createElement("code", null, "<ButtonGroup>"),
                              " can be used to group a set of ",
                              createElement("code", null, "<ButtonGroupChild>"),
                              " (which is the exact same as a ",
                              createElement("code", null, "<Button>"),
                              ", but with an ",
                              createElement("code", null, "index"),
                              " prop). This gives them keyboard navigation abilities."),
                          createElement(CardElement, null,
                              createElement(ButtonGroup, { wrap: true },
                                  createElement(ButtonGroupChild, { index: 0, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress }, "First button"),
                                  createElement(ButtonGroupChild, { index: 1, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress }, "Second button"),
                                  createElement(ButtonGroupChild, { index: 2, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress }, "Third button"),
                                  createElement(ButtonGroupChild, { index: 3, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress }, "Fourth button"),
                                  createElement(ButtonGroupChild, { index: 4, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress }, "Fifth button"),
                                  createElement(ButtonGroupChild, { index: 5, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress }, "Sixth button"),
                                  createElement(ButtonGroupChild, { index: 6, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress }, "Seventh button"),
                                  createElement(ButtonGroupChild, { index: 7, fillVariant: buttonsFill, colorVariant: buttonsColor, onPress: onPress }, "Eighth button"))),
                          createElement(CardElement, { type: "paragraph" },
                              createElement("code", null, `<ButtonGroup wrap>
    <ButtonGroupChild index={0}>First button</ButtonGroupChild>
    <ButtonGroupChild index={1}>Second button</ButtonGroupChild>
    <ButtonGroupChild index={2}>Third button</ButtonGroupChild>
    <ButtonGroupChild index={3}>Fourth button</ButtonGroupChild>
    <ButtonGroupChild index={4}>Fifth button</ButtonGroupChild>
    <ButtonGroupChild index={5}>Sixth button</ButtonGroupChild>
    <ButtonGroupChild index={6}>Seventh button</ButtonGroupChild>
    <ButtonGroupChild index={7}>Eighth button</ButtonGroupChild>
</ButtonGroup>`))))))));
  }
  async function sleep$5(arg0) {
      return new Promise(resolve => setTimeout(resolve, arg0));
  }

  function DemoChecks() {
      const [asyncFails, setAsyncFails] = useState(false);
      const [asyncTimeout, setAsyncTimeout] = useState(3000);
      const [usesAsync, setUsesAsync] = useState(true);
      const [demoChecked, setDemoChecked] = useState(false);
      const [demoRadio, setDemoRadio] = useState(0);
      const [radioCount, setRadioCount] = useState(3);
      const [disabled, setDisabled] = useState(false);
      const [labelPosition, setLabelPosition] = useState("end");
      const asyncCheckboxInput = useCallback(async (checked) => {
          await sleep$4(asyncTimeout);
          if (asyncFails)
              throw new Error("Attempt to change checkbox & radio failed");
          setDemoChecked(checked);
      }, [asyncTimeout, asyncFails]);
      const asyncRadioInput = useCallback(async (value) => {
          await sleep$4(asyncTimeout);
          if (asyncFails)
              throw new Error("Attempt to change radio failed");
          setDemoRadio(value);
      }, [asyncTimeout, asyncFails]);
      return (createElement("div", { class: "demo" },
          createElement(Card, null,
              createElement(CardElement, { type: "title", tag: "h2" }, "Checkboxes, switches, & radios"),
              createElement(CardElement, null,
                  createElement(Checkbox, { checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "I'm a checkbox")),
              createElement(CardElement, null,
                  "Several components related to on/off togglable form-like selection controls are provided:",
                  createElement("ul", null,
                      createElement("li", null,
                          createElement("code", null, "Checkbox")),
                      createElement("li", null,
                          createElement("code", null, "Switch")),
                      createElement("li", null,
                          createElement("code", null, "Radio")),
                      createElement("li", null,
                          createElement("code", null, "Checkbox Group"))),
                  createElement("code", null, "Checkbox"),
                  " and ",
                  createElement("code", null, "Switch"),
                  " work as you'd expect. ",
                  createElement("code", null, "RadioGroup"),
                  " is a parent around a set of ",
                  createElement("code", null, "Radio"),
                  " components that communicate with each other. The children ",
                  createElement("code", null, "Radio"),
                  " components can be any descendant of the parent ",
                  createElement("code", null, "RadioGroup"),
                  " \u2013 the DOM structure ",
                  createElement("em", null, "does not"),
                  " matter beyond requiring they be somewhere descendant. ",
                  createElement("code", null, "CheckboxGroup"),
                  " works similarly to ",
                  createElement("code", null, "RadioGroup"),
                  " in that way."),
              createElement(CardElement, null,
                  "See Also: Single Select lists for an alternative to ",
                  createElement("code", null, "RadioGroup"),
                  ", and Multi Select lists for an alternative to ",
                  createElement("code", null, "CheckboxGroup"),
                  "."),
              createElement(CardElement, { type: "subtitle", tag: "h3" }, "Async inputs"),
              createElement(CardElement, null,
                  "The ",
                  createElement("code", null, "onInput"),
                  " event handler for all types of inputs can be sync or async.",
                  createElement(InputGrid, null,
                      createElement(InputGroup, null,
                          createElement(Checkbox, { onCheck: setUsesAsync, checked: usesAsync, labelPosition: "start" }, "Async event handler")),
                      createElement(InputGroup, null,
                          createElement(Checkbox, { onCheck: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync }, "Async handler rejects")),
                      createElement(InputGroup, null,
                          createElement(Input, { disabled: !usesAsync, type: "number", onValueChange: setAsyncTimeout, value: asyncTimeout }, "Async timeout")),
                      createElement(InputGroup, null,
                          createElement(Input, { type: "number", onValueChange: setRadioCount, value: radioCount }, "# of radio buttons")))),
              createElement(CardElement, null,
                  createElement(Checkbox, { checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Checkbox"),
                  createElement(Switch, { checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Switch")),
              createElement(CardElement, null,
                  createElement(RadioGroup, { name: "radio-demo-1", selectedValue: demoRadio, onValueChange: usesAsync ? asyncRadioInput : setDemoRadio }, Array.from(function* () {
                      for (let i = 0; i < radioCount; ++i) {
                          yield createElement(Radio, { index: i, value: i, key: i },
                              "Radio #",
                              i + 1);
                      }
                  }()))),
              createElement(CardElement, { type: "paragraph" },
                  createElement("code", null, `<Checkbox checked={checked} onInput={setChecked}>Checkbox</Checkbox>
<Switch checked={checked} onInput={onInput}>Switch</Switch>
<RadioGroup name="radio-demo-1" selectedValue={value} onInput={setValue}>
<Radio index={0} value="value1">Radio #1</Radio>
<Radio index={1} value="value2">Radio #2</Radio>
<Radio index={2} value="value3">Radio #3</Radio>
</RadioGroup>`)),
              createElement("hr", null),
              createElement(CardElement, { type: "subtitle", tag: "h3" }, "Disabling"),
              createElement(CardElement, null,
                  "When disabled, all inputs remain focusable so that they can still be announced by screen readers, have tooltips via mouseover, etc.",
                  createElement(InputGroup, null,
                      createElement(Checkbox, { onCheck: setDisabled, checked: disabled, labelPosition: "start" }, "Inputs disabled"))),
              createElement(CardElement, null,
                  createElement(Checkbox, { disabled: disabled, checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Checkbox"),
                  createElement(Switch, { disabled: disabled, checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Switch")),
              createElement(CardElement, null,
                  createElement(RadioGroup, { name: "radio-demo-2", selectedValue: Math.min(2, demoRadio), onValueChange: usesAsync ? asyncRadioInput : setDemoRadio },
                      createElement(Radio, { disabled: disabled, index: 0, value: 0 }, "Radio #1"),
                      createElement(Radio, { disabled: disabled, index: 1, value: 1 }, "Radio #2"),
                      createElement(Radio, { disabled: disabled, index: 2, value: 2 }, "Radio #3"))),
              createElement("hr", null),
              createElement(CardElement, { type: "subtitle", tag: "h3" },
                  createElement("code", null, "InputGroup"),
                  " styling"),
              createElement(CardElement, { type: "paragraph" },
                  "An ",
                  createElement("code", null, "<InputGroup>"),
                  " can be used to significantly change the styling of input components. The inputs and their labels will style themselves or automatically wrap themselves in ",
                  createElement("code", null, "<InputGroupText>"),
                  " as appropriate."),
              createElement(CardElement, null,
                  createElement(InputGrid, null,
                      createElement(InputGroup, null,
                          createElement(Checkbox, { checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Checkbox")),
                      createElement(InputGroup, null,
                          createElement(Switch, { checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Switch")),
                      createElement(RadioGroup, { name: "radio-demo-5", selectedValue: Math.min(2, demoRadio), onValueChange: usesAsync ? asyncRadioInput : setDemoRadio },
                          createElement(InputGroup, null,
                              createElement(Radio, { index: 0, value: 0 }, "Radio #1")),
                          createElement(InputGroup, null,
                              createElement(Radio, { index: 1, value: 1 }, "Radio #2")),
                          createElement(InputGroup, null,
                              createElement(Radio, { index: 2, value: 2 }, "Radio #3"))))),
              createElement(CardElement, { type: "paragraph" },
                  createElement("code", null, `<InputGroup>
    <Checkbox checked={checked} onInput={setChecked}>Checkbox</Checkbox>
</InputGroup>
<InputGroup>
    <Switch checked={checked} onInput={onInput}>Switch</Switch>
</InputGroup>
<RadioGroup name="radio-demo-5" selectedValue={value} onInput={setValue}>
    <InputGroup>
        <Radio index={0} value="value1" labelPosition="start">Radio #1</Radio>
        <Radio index={1} value="value2" labelPosition="hidden">Radio #2</Radio>
        <Radio index={2} value="value3" labelPosition="end">Radio #3</Radio>
    </InputGroup>
</RadioGroup>`)),
              createElement("hr", null),
              createElement(CardElement, { type: "subtitle", tag: "h3" }, "Labels"),
              createElement(CardElement, null,
                  "By default, the label is positioned after the checkbox, radio, or switch.  You can change this with ",
                  createElement("code", null, "labelPosition"),
                  "."),
              createElement(CardElement, null,
                  "Note that the ",
                  createElement("code", null, "start"),
                  " label position only has any visual effect while in an ",
                  createElement("code", null, "InputGroup"),
                  ", as Bootstrap places \"naked\" checkboxes and such in the margin area before the label no matter what order they come in the DOM."),
              createElement(CardElement, null,
                  createElement(RadioGroup, { name: "radio-demo-6", selectedValue: labelPosition, onValueChange: setLabelPosition, labelPosition: labelPosition },
                      createElement(Radio, { labelPosition: labelPosition, index: 0, value: "start" }, "Before"),
                      createElement(Radio, { labelPosition: labelPosition, index: 1, value: "end" }, "After"),
                      createElement(Radio, { labelPosition: labelPosition, index: 2, value: "hidden" }, "Hidden (still announced verbally)"))),
              createElement(CardElement, null,
                  createElement(InputGrid, null,
                      createElement(InputGroup, null,
                          createElement(Checkbox, { labelPosition: labelPosition, checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Checkbox")),
                      createElement(InputGroup, null,
                          createElement(Switch, { labelPosition: labelPosition, checked: demoChecked, onCheck: usesAsync ? asyncCheckboxInput : setDemoChecked }, "Switch")),
                      createElement(RadioGroup, { name: "radio-demo-7", selectedValue: Math.min(2, demoRadio), onValueChange: usesAsync ? asyncRadioInput : setDemoRadio },
                          createElement(InputGroup, null,
                              createElement(Radio, { labelPosition: labelPosition, index: 0, value: 0 }, "Radio #1")),
                          createElement(InputGroup, null,
                              createElement(Radio, { labelPosition: labelPosition, index: 1, value: 1 }, "Radio #2")),
                          createElement(InputGroup, null,
                              createElement(Radio, { labelPosition: labelPosition, index: 2, value: 2 }, "Radio #3"))))))));
  }
  async function sleep$4(arg0) {
      return new Promise(resolve => setTimeout(resolve, arg0));
  }

  function DemoInputs() {
      const [asyncFails, setAsyncFails] = useState(false);
      const [asyncTimeout, setAsyncTimeout] = useState(3000);
      const [usesAsync, setUsesAsync] = useState(true);
      const [text, setText] = useState("");
      const [number, setNumber] = useState(0);
      const [size, setSize] = useState("md");
      const asyncTextInput = useCallback(async (text) => {
          await sleep$3(asyncTimeout);
          if (asyncFails)
              throw new Error("Attempt to change text failed");
          setText(text);
      }, [asyncTimeout, asyncFails]);
      const asyncNumberInput = useCallback(async (value) => {
          await sleep$3(asyncTimeout);
          if (asyncFails)
              throw new Error("Attempt to change number failed");
          setNumber(value);
      }, [asyncTimeout, asyncFails]);
      const onTextInput = usesAsync ? asyncTextInput : setText;
      const onNumberInput = usesAsync ? asyncNumberInput : setNumber;
      return (createElement("div", { class: "demo" },
          createElement(Card, null,
              createElement(CardElement, { type: "title", tag: "h2" }, "Text boxes"),
              createElement(CardElement, null,
                  createElement("div", { class: "position-relative" },
                      createElement(Input, { type: "text", value: text, onValueChange: onTextInput }, "I'm a text box"))),
              createElement(CardElement, null,
                  createElement("code", null, "<Input>"),
                  " components allow for inputting text, numbers, etc. and asyncronously saving it somewhere else as it's being typed."),
              createElement(CardElement, { type: "subtitle", tag: "h3" }, "Async inputs"),
              createElement(CardElement, null,
                  "The ",
                  createElement("code", null, "onInput"),
                  " event handler for all types of inputs can be sync or async.",
                  createElement(InputGrid, null,
                      createElement(InputGroup, null,
                          createElement(Checkbox, { onCheck: setUsesAsync, checked: usesAsync, labelPosition: "start" }, "Async event handler")),
                      createElement(InputGroup, null,
                          createElement(Checkbox, { onCheck: setAsyncFails, checked: asyncFails, labelPosition: "start", disabled: !usesAsync }, "Async handler rejects")),
                      createElement(InputGroup, null,
                          createElement(Input, { disabled: !usesAsync, type: "number", onValueChange: setAsyncTimeout, value: asyncTimeout }, "Async timeout")))),
              createElement(CardElement, null,
                  createElement("div", { class: "position-relative" },
                      createElement(Input, { type: "text", value: text, onValueChange: onTextInput }, "Text-based input")),
                  createElement("div", { class: "position-relative" },
                      createElement(Input, { type: "number", value: number, onValueChange: onNumberInput, min: -5 }, "Number-based input"))),
              createElement(CardElement, { type: "paragraph" },
                  createElement("code", null, `<Input type="text" value={text} onInput={onTextInput}>Text-based input</Input>
<Input type="number" value={number} onInput={onNumberInput} min={-5}>Number-based input</Input>`)),
              createElement(CardElement, { type: "paragraph" },
                  "When placed in an ",
                  createElement("code", null, "<InputGroup>"),
                  ", the styling will be significantly different:"),
              createElement(CardElement, null,
                  createElement(ButtonGroup, null,
                      createElement(ButtonGroupChild, { index: 0, pressed: size == "sm", onPressToggle: e => setSize("sm") }, "Small"),
                      createElement(ButtonGroupChild, { index: 1, pressed: size == "md", onPressToggle: e => setSize("md") }, "Medium"),
                      createElement(ButtonGroupChild, { index: 2, pressed: size == "lg", onPressToggle: e => setSize("lg") }, "Large"))),
              createElement(CardElement, null,
                  createElement(InputGrid, null,
                      createElement(InputGroup, { size: size },
                          createElement(Input, { type: "text", value: text, onValueChange: onTextInput }, "Text-based input")),
                      createElement(InputGroup, { size: size },
                          createElement(Input, { type: "number", value: number, onValueChange: onNumberInput, min: -5 }, "Number-based input")))),
              createElement(CardElement, { type: "paragraph" },
                  createElement("code", null, `<InputGrid>
    <InputGroup size={size}><Input type="text" value={text} onInput={onTextInput}>Text-based input</Input></InputGroup>
    <InputGroup size={size}><Input type="number" value={number} onInput={onNumberInput} min={-5}>Number-based input</Input></InputGroup>
</InputGrid>`)))));
  }
  async function sleep$3(arg0) {
      return new Promise(resolve => setTimeout(resolve, arg0));
  }

  function DemoLayout() {
      return (createElement("div", { class: "demo" },
          createElement(Card, null,
              createElement(CardElement, { type: "title", tag: "h2" }, "Layout"),
              createElement(CardElement, null, "A number of utility components and CSS classes are provided to make it easier to create quick and dirty layouts."),
              createElement(CardElement, { type: "subtitle", tag: "h3" }, "Simple grids"),
              createElement(CardElement, null,
                  "Two different grid components are provided for two separate use cases:",
                  createElement("ul", null,
                      createElement("li", null,
                          "<",
                          createElement("code", null, "GridResponsive"),
                          ">, which takes a minimum column size and fits as many columns as possible given that constraint"),
                      createElement("li", null,
                          "<",
                          createElement("code", null, "GridStatic"),
                          ">, which takes a minimum column count and fits that many columns in no matter the resulting size and/or jankiness"))),
              createElement(CardElement, { type: "subtitle", tag: "h3" },
                  createElement("code", null, "<InputGroup>"),
                  " & ",
                  createElement("code", null, "<InputGrid>")),
              createElement(CardElement, null,
                  "All input types, from checkboxes to number inputs, can be placed within an ",
                  createElement("code", null, "<InputGrid>"),
                  " to give an alternate styling to the default \"free floating\" style."),
              createElement("div", { style: { display: "contents", "--static-grid-columns": "10em auto" } },
                  createElement(CardElement, null,
                      "With an ",
                      createElement("code", null, "<InputGroup>"),
                      ":",
                      createElement(GridStatic, { columns: 2 },
                          createElement(InputGroup, null,
                              createElement(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Checkbox")),
                          createElement("code", null, `<InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>`))),
                  createElement(CardElement, null,
                      "Without an ",
                      createElement("code", null, "<InputGroup>"),
                      ":",
                      createElement(GridStatic, { columns: 2 },
                          createElement(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Checkbox"),
                          createElement("code", null, `<Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox>`)))),
              createElement(CardElement, null,
                  "In addition, to help with alignment, a set of ",
                  createElement("code", null, "InputGroup"),
                  "s can also be placed within an ",
                  createElement("code", null, "InputGrid"),
                  " to manage simple cases.",
                  createElement("code", null, `<InputGrid>
    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
    {...}
</InputGrid>`)),
              createElement(CardElement, null,
                  "With an ",
                  createElement("code", null, "<InputGrid>"),
                  ":",
                  createElement(InputGrid, null,
                      createElement(InputGroup, null,
                          createElement(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Checkbox")),
                      createElement(InputGroup, null,
                          createElement(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Another checkbox")),
                      createElement(InputGroup, null,
                          createElement(Input, { disabled: true, onValueChange: () => { }, type: "number", value: 0 }, "Numeric input")))),
              createElement(CardElement, null,
                  "Without an ",
                  createElement("code", null, "<InputGrid>"),
                  ":",
                  createElement(InputGroup, null,
                      createElement(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Checkbox")),
                  createElement(InputGroup, null,
                      createElement(Checkbox, { disabled: true, checked: true, labelPosition: "start" }, "Another checkbox")),
                  createElement(InputGroup, null,
                      createElement(Input, { disabled: true, onValueChange: () => { }, type: "number", value: 0 }, "Numeric input"))))));
  }

  const TableSectionContext = createContext(null);
  const TableRowContext = createContext(null);
  createContext([]);
  const Table = memo(forwardElementRef(function Table({
    children,
    small,
    striped,
    hoverable,
    border,
    variant,
    borderColor,
    ...props
  }, ref) {
    useLogRender("Table", `Rendering Table`);
    const {
      useTableProps,
      useTableSection,
      managedTableSections
    } = useTable({});
    return createElement("table", { ...useTableProps(useMergedProps()({
        ref,
        className: clsx("table", small && "table-sm", striped && "table-striped", hoverable && "table-hover", border === "all" && "table-bordered", border === "none" && "table-borderless", variant && `table-${variant}`, borderColor && `border-${borderColor}`)
      }, props))
    }, createElement(TableSectionContext.Provider, {
      value: useTableSection
    }, children));
  }));
  const CellLocationContext = createContext(null);
  const TableSectionImpl = memo(forwardElementRef(function TableSectionImpl({
    tag,
    children,
    ...props
  }, ref) {
    return createElement(tag, { ...props,
      ref,
      children: Array.isArray(children) ? children : [children]
    });
  }));
  const TableSection = memo(forwardElementRef(function TableSection({
    location,
    tag,
    ...props
  }, ref) {
    const useTableSection = useContext(TableSectionContext);
    const {
      useTableRow,
      useTableSectionProps
    } = useTableSection({
      location
    });
    return createElement(TableRowContext.Provider, {
      value: useTableRow
    }, createElement(TableSectionImpl, {
      tag: tag,
      ...useTableSectionProps({ ...props,
        ref: ref
      })
    }));
  }));
  const TableHead = memo(forwardElementRef(function TableHead({
    variant,
    ...props
  }, ref) {
    useLogRender("TableHead", `Rendering TableHead`);
    const [showShadow, setShowShadow] = useState(false);
    const {
      getElement,
      useRefElementProps
    } = useRefElement({});
    useGlobalHandler(window, "scroll", e => {
      var _getElement;

      return setShowShadow(!!((_getElement = getElement()) !== null && _getElement !== void 0 && _getElement.offsetTop));
    }, {
      passive: true
    });
    return createElement(CellLocationContext.Provider, {
      value: "head"
    }, createElement(TableSection, {
      location: "head",
      tag: "thead",
      ...useRefElementProps(useMergedProps()({
        ref,
        className: clsx("elevation-body-surface", showShadow && "floating", variant && `table-${variant}`)
      }, props))
    }));
  }));
  const TableBody = memo(forwardElementRef(function TableBody({
    children,
    variant,
    ...props
  }, ref) {
    useLogRender("TableBody", `Rendering TableBody`);
    return createElement(CellLocationContext.Provider, {
      value: "body"
    }, createElement(TableSection, {
      location: "body",
      tag: "tbody",
      ...useMergedProps()({
        ref,
        children,
        className: clsx(variant && `table-${variant}`)
      }, props)
    }));
  }));
  memo(forwardElementRef(function TableFoot({
    children,
    variant,
    ...props
  }, ref) {
    useLogRender("TableFoot", `Rendering TableFoot`);
    return createElement(CellLocationContext.Provider, {
      value: "foot"
    }, createElement(TableSection, {
      location: "foot",
      tag: "tfoot",
      ...useMergedProps()({
        ref,
        children: Array.isArray(children) ? children : [children],
        className: clsx(variant && `table-${variant}`)
      }, props)
    }));
  }));
  const TableCellContext = createContext(null);
  const TableHeadCellContext = createContext(null);
  const TableRow = memo(forwardElementRef(function TableRow({
    children,
    rowIndex: indexAsUnsorted,
    variant,
    hidden: hiddenAsUnsorted,
    ...props
  }, ref) {
    useLogRender("TableRow", `Rendering TableRow #${indexAsUnsorted}, ${hiddenAsUnsorted}`);
    const location = useContext(CellLocationContext);
    const useTableRow = useContext(TableRowContext);
    const {
      useTableCell,
      useTableHeadCell,
      useTableRowProps
    } = useTableRow({
      rowIndex: indexAsUnsorted,
      location,
      hidden: !!hiddenAsUnsorted
    });
    const rowProps = useTableRowProps({ ...useMergedProps()({
        children,
        ref,
        className: clsx(variant && `table-${variant}`)
      }, props)
    });
    return createElement(TableCellContext.Provider, {
      value: useTableCell
    }, createElement(TableHeadCellContext.Provider, {
      value: useTableHeadCell
    }, createElement("tr", { ...rowProps
    })));
  }));
  const TableCell = memo(forwardElementRef(function TableCell({
    value: valueAsUnsorted,
    colSpan,
    children,
    columnIndex,
    variant,
    focus,
    active,
    ...props
  }, ref) {
    //focus ??= "cell";
    const useTableCell = useContext(TableCellContext);
    const {
      useTableCellDelegateProps,
      useTableCellProps
    } = useTableCell({
      columnIndex,
      value: valueAsUnsorted
    });
    const childrenReceiveFocus = focus != "cell" && !!children && typeof children == "object" && "type" in children && children.type !== Fragment;
    const displayValue = children !== null && children !== void 0 ? children : valueAsUnsorted;
    const cellProps = useTableCellProps({
      ref,
      colSpan,
      className: clsx(variant && `table-${variant}`)
    });

    if (childrenReceiveFocus) {
      const p1 = useMergedProps()(useTableCellDelegateProps({}), props);
      return createElement("td", { ...cellProps
      }, cloneElement(children, useMergedProps()(p1, children.props), children.props.children));
    } else {
      const p2 = useMergedProps()(useTableCellDelegateProps(cellProps), props);
      return createElement("td", { ...p2
      }, stringify(displayValue));
    }
  }));
  const TableHeaderCell = memo(forwardElementRef(function TableHeaderCell({
    columnIndex,
    focus,
    children,
    variant,
    active,
    unsortable,
    ...props
  }, ref) {
    const useTableHeadCell = useContext(TableHeadCellContext);
    const {
      useTableHeadCellDelegateProps,
      useTableHeadCellProps,
      sortDirection
    } = useTableHeadCell({
      tag: "th",
      columnIndex
    });
    const childrenReceiveFocus = focus != "cell" && !!children && typeof children == "object" && "type" in children && children.type !== Fragment;
    const {
      hovering,
      useIsHoveringProps
    } = useIsHovering();
    const cellProps = useTableHeadCellProps(useIsHoveringProps(useMergedProps()({
      ref,
      role: "columnheader",
      className: clsx(variant && `table-${variant}`, unsortable && "unsortable")
    }, props)));
    const sortIcon = createElement(Swappable, null, createElement("div", { ...{
        class: clsx("table-sort-icon-container")
      }
    }, createElement(Flip, {
      flipAngleInline: 180,
      show: sortDirection == "descending"
    }, createElement("div", {
      class: "bi bi-sort-up"
    })), createElement(Flip, {
      flipAngleInline: 180,
      show: hovering && sortDirection == null || sortDirection == "ascending"
    }, createElement("div", {
      class: "bi bi-sort-down-alt"
    }))));

    if (childrenReceiveFocus) {
      const p1 = useMergedProps()(useTableHeadCellDelegateProps({}), props);
      return createElement("th", { ...cellProps
      }, createElement("div", {
        class: "th-spacing"
      }, cloneElement(children, useMergedProps()(p1, children.props), children.props.children), sortIcon));
    } else {
      const p2 = useMergedProps()(useTableHeadCellDelegateProps(cellProps), props);
      return createElement("th", { ...p2
      }, createElement("div", {
        class: "th-spacing"
      }, children, sortIcon));
    }
  }));

  function useIsHovering() {
    const [hovering, setHovering] = useState(false);
    const onMouseEnter = useCallback(() => {
      setHovering(true);
    }, []);
    const onMouseLeave = useCallback(() => {
      setHovering(false);
    }, []);
    useGlobalHandler(window, "blur", onMouseLeave);
    return {
      hovering,
      useIsHoveringProps: props => useMergedProps()({
        onMouseEnter,
        onMouseLeave
      }, props)
    };
  }

  function stringify(value) {
    if (value == null) return null;
    if (value instanceof Date || ["boolean", "string", "number"].includes(typeof value)) return `${value}`;
    return value;
  }

  var RandomWords$1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");
  const formatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" });
  const RandomRow = memo(function RandomRow({ rowIndex, unsortedRowIndex, hidden }) {
      console.log(`RandomRow ${rowIndex}, ${unsortedRowIndex}`);
      const i = rowIndex;
      const w = RandomWords$1[i];
      const n = (i + 0) ** 2;
      const d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + n * 7);
      const [checked, setChecked] = useState(false);
      const onInput = useCallback(async (checked) => {
          await sleep$2(2000);
          setChecked(checked);
      }, []);
      return (createElement(TableRow, { hidden: hidden, rowIndex: rowIndex },
          createElement(TableCell, { columnIndex: 0, value: n, colSpan: !w ? 2 : undefined }),
          w && createElement(TableCell, { columnIndex: 1, value: w }),
          createElement(TableCell, { columnIndex: 2, value: d }, formatter.format(d)),
          createElement(TableCell, { columnIndex: 3, value: checked },
              createElement(Checkbox, { checked: checked, onCheck: onInput, labelPosition: "hidden" }, "Demo table checkbox"))));
  });
  function DemoTable() {
      const [rowCount, setRowCount] = useState(5);
      const [filterEvens, setFilterEvens] = useState(false);
      return (createElement("div", { class: "demo" },
          createElement(Card, null,
              createElement(CardElement, { type: "title", tag: "h2" }, "Table"),
              createElement(CardElement, null,
                  "Tables allow for automatic display, navigation, sorting, and filtering of data. All data is provided by the children and you don't need to provide a data structure to the parent ",
                  createElement("code", null, "Table"),
                  " element, and by default all columns are user-sortable."),
              createElement(CardElement, null,
                  "All ",
                  createElement("code", null, "TableCell"),
                  "s must be given a ",
                  createElement("code", null, "value"),
                  " prop that represents its data. This can be anything from a string to a number to a Date, and it controls how, when that column is sorted, it is compared against its siblings."),
              createElement(CardElement, null,
                  "A ",
                  createElement("code", null, "<TableCell>"),
                  " will, by default, just display its ",
                  createElement("code", null, "value"),
                  ". If you need to show something different, format the value, etc. just pass the value you'd like to show instead as a child. Children will take priority over ",
                  createElement("code", null, "value"),
                  " in terms of what to display, but sorting will be entirely unaffected by this, relying solely on the ",
                  createElement("code", null, "value"),
                  " prop."),
              createElement(CardElement, null,
                  "However, please note that if you pass a child component to a ",
                  createElement("code", null, "TableCell"),
                  ", it will be put in charge of that cell's navigation and focus management, ",
                  createElement("strong", null, "so it needs to be a component that accepts and forwards onwards all incoming props and refs"),
                  ". (Fragments as an immediate child are an exception and are fine to use)",
                  createElement("code", null, `// The table cell itself will receive focus:
<TableCell>Text</TableCell>
<TableCell>0</TableCell>
<TableCell><>Text</></TableCell>

// The table cell will delegate focus to its contents instead:
<TableCell><div>Text</div></TableCell>
<TableCell><Input type="..." {...} /></TableCell>

// ❌ The cell will try to focus the child but it'll never receive the message!
<TableCell>{(props) => "text"}</TableCell>

// ✅ The cell can properly delegate all duties to the child DIV.
<TableCell>{forwardRef((p, ref) => <div ref={ref} {...p}>"text"</p>)}</TableCell>`)),
              createElement(CardElement, null,
                  "Finally, due to the way sorting works (by manipulating the ",
                  createElement("code", null, "key"),
                  " prop of the table's rows), your rows ",
                  createElement("em", null, "must"),
                  " be ",
                  createElement("em", null, "direct descendants"),
                  " of ",
                  createElement("code", null, "TableBody"),
                  " (and ",
                  createElement("code", null, "TableHead"),
                  " and ",
                  createElement("code", null, "TableFoot"),
                  ") so that it can properly call ",
                  createElement("code", null, "createElement"),
                  " with the expected results. You can create your own custom ",
                  createElement("code", null, "TableRow"),
                  " wrapper component, and the \"direct descendant\" restriction will apply to the wrapper instead."),
              createElement(CardElement, null,
                  createElement(Input, { type: "number", value: rowCount, min: 0, max: 255, onValueChange: setRowCount }, "Row count"),
                  createElement(Checkbox, { checked: filterEvens, onCheck: setFilterEvens }, "Filter out even numbers")),
              createElement(CardElement, null,
                  createElement(Table, null,
                      createElement(TableHead, null,
                          createElement(TableRow, { hidden: false, rowIndex: 0 },
                              createElement(TableHeaderCell, { columnIndex: 0 }, "Number"),
                              createElement(TableHeaderCell, { columnIndex: 1 }, "String"),
                              createElement(TableHeaderCell, { columnIndex: 2 }, "Date"),
                              createElement(TableHeaderCell, { columnIndex: 3 }, "Checkbox"))),
                      createElement(TableBody, { ...{ "data-test": filterEvens } }, Array.from(function* () {
                          for (let i = 0; i < rowCount; ++i) {
                              yield createElement(RandomRow, { key: i, rowIndex: i, hidden: filterEvens && i % 2 == 0 });
                              /*<TableRow rowIndex={1 + i}>
                              <TableCell columnIndex={0} value={i} />
                              <TableCell columnIndex={1} value={RandomWords[i]} />
                              <TableCell columnIndex={2} value={new Date()} />
                          </TableRow>*/
                              //
                          }
                      }())))),
              createElement(CardElement, null,
                  createElement("code", null, `<Table>
    <TableHead>
        <TableRow rowIndex={0}>
            <TableHeaderCell columnIndex={0}>Number</TableHeaderCell>
            <TableHeaderCell columnIndex={1}>String</TableHeaderCell>
            <TableHeaderCell columnIndex={2}>Date</TableHeaderCell>
            <TableHeaderCell columnIndex={3}>Checkbox</TableHeaderCell>
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow rowIndex={1}>
            <TableCell columnIndex={0} value={n} />
            <TableCell columnIndex={1} value={RandomWords[index]} />
            <TableCell columnIndex={2} value={d}>{d.toLocaleString()}</TableCell>
            <TableCell columnIndex={3} value={checked}>
                <Checkbox checked={checked} onInput={onInput} labelPosition="hidden">Demo table checkbox</Checkbox>
            </TableCell>
        </TableRow>

        <TableRow rowIndex={2} />
        <TableRow rowIndex={3} hidden />
        <TableRow rowIndex={4} />
        <TableRow rowIndex={5} />

    </TableBody>
    <TableFoot>
        <ACustomTableRow rowIndex={6} />
    </TableFoot>
</Table>`)))));
  }
  async function sleep$2(arg0) {
      return new Promise(resolve => setTimeout(resolve, arg0));
  }

  function DemoMenus() {
      const [positionInline, setPositionInline] = useState("start");
      const [positionBlock, setPositionBlock] = useState("end");
      useState(false);
      const [asyncTimeout, setAsyncTimeout] = useState(3000);
      useState(true);
      const [asyncFails, setAsyncFails] = useState(false);
      useState(true);
      const pushToast = usePushToast();
      const onPressSync = () => pushToast(createElement(Toast, null, "Menu item was clicked"));
      const onPressAsync = async () => {
          await sleep$1(asyncTimeout);
          if (asyncFails)
              throw new Error("Button operation failed.");
          else
              onPressSync();
      };
      return (createElement("div", { class: "demo" },
          createElement(Card, null,
              createElement(CardElement, { type: "title", tag: "h2" }, "Menus"),
              createElement(CardElement, null,
                  createElement(Menu, { anchor: createElement(Button, null, "I'm a menu") },
                      createElement(MenuItem, { index: 0, onPress: onPressAsync }, "A: Item 1"),
                      createElement(MenuItem, { index: 1, onPress: onPressAsync }, "B: Item 2"),
                      createElement(MenuItem, { index: 2, onPress: onPressAsync }, "C: Item 3"),
                      createElement(MenuItem, { index: 3 }, "I'm static"))),
              createElement(CardElement, null,
                  createElement("code", null, "<Menu>"),
                  "s are effectively popup ",
                  createElement("code", null, "<List>"),
                  "s. This gives them all the usual list stuff like keyboard navigation (either with the arrow keys or by typing the text content of the ",
                  createElement("code", null, "<MenuItem>"),
                  "), with the popup logic handled by ",
                  createElement("a", { href: "https://popper.js.org/" }, "Popper"),
                  "."),
              createElement(CardElement, null,
                  createElement("code", null, `<Menu anchor={<Button>I'm a menu</Button>}>
    <MenuItem index={0} onPress={onPress}>A: Item 1</MenuItem>
    <MenuItem index={1} onPress={onPress}>B: Item 2</MenuItem>
    <MenuItem index={2} onPress={onPress}>C: Item 3</MenuItem>
    <MenuItem index={3}>I'm static</MenuItem>
</Menu>`)),
              createElement("hr", null),
              createElement(CardElement, { type: "subtitle", tag: "h3" }, "Structure"),
              createElement(CardElement, null,
                  "A ",
                  createElement("code", null, "<Menu>"),
                  " requires both a selection of ",
                  createElement("code", null, "<MenuItem>"),
                  "s and also an ",
                  createElement("code", null, "anchor"),
                  ", provided by the prop of the same name.  By default, it's assumed that this will be a component that acceps an ",
                  createElement("code", null, "onPress"),
                  " event handler, like ",
                  createElement("code", null, "<Button>"),
                  "s do.  If you need to use a different event handler (such as ",
                  createElement("code", null, "onClick"),
                  ", if your menu isn't tied to a ",
                  createElement("code", null, "<Button>"),
                  "), you can pass the name of the prop to use instead to ",
                  createElement("code", null, "<anchorEventName>")),
              createElement("hr", null),
              createElement(CardElement, { type: "subtitle", tag: "h3" }, "Positioning"),
              createElement(CardElement, { type: "paragraph" },
                  "A menu's position is, by default, at the start of the line and the bottom of the block (the bottom left corner for this writing mode). You can manipulate this with the ",
                  createElement("code", null, "inlinePosition"),
                  " and ",
                  createElement("code", null, "blockPosition"),
                  " props."),
              createElement(CardElement, { type: "paragraph" }, "The menu will also automatically flip when reaching the edge of the viewport."),
              createElement(CardElement, null,
                  createElement(GridStatic, { columns: 3 },
                      createElement("div", null),
                      createElement(Button, { colorVariant: "secondary", pressed: positionBlock === "start", onPressToggle: (pressed) => void (pressed && setPositionBlock("start")) }, "Block start"),
                      createElement("div", null),
                      createElement(Button, { colorVariant: "secondary", pressed: positionInline === "start", onPressToggle: (pressed) => void (pressed && setPositionInline("start")) }, "Inline start"),
                      createElement(Menu, { anchor: createElement(Button, null, "Anchored menu"), positionBlock: positionBlock, positionInline: positionInline },
                          createElement(MenuItem, { index: 0, onPress: onPressAsync }, "A: Item 1"),
                          createElement(MenuItem, { index: 1, onPress: onPressAsync }, "B: Item 2"),
                          createElement(MenuItem, { index: 2, onPress: onPressAsync }, "C: Item 3"),
                          createElement(MenuItem, { index: 3 }, "I'm static")),
                      createElement(Button, { colorVariant: "secondary", pressed: positionInline === "end", onPressToggle: (pressed) => void (pressed && setPositionInline("end")) }, "Inline end"),
                      createElement("div", null),
                      createElement(Button, { colorVariant: "secondary", pressed: positionBlock === "end", onPressToggle: (pressed) => void (pressed && setPositionBlock("end")) }, "Block end"),
                      createElement("div", null))),
              createElement("hr", null),
              createElement(CardElement, { type: "subtitle", tag: "h3" }, "Transitions"),
              createElement(CardElement, { tag: "div" },
                  "By default, ",
                  createElement("code", null, "<Menu>"),
                  "s use a ",
                  createElement("code", null, "<ZoomFade>"),
                  " as their transition. This can be customized by doing the following:",
                  createElement("ul", null,
                      createElement("li", null,
                          "Provide a ",
                          createElement("code", null, "Transition"),
                          " prop."),
                      createElement("li", null,
                          "The ",
                          createElement("code", null, "<Menu>"),
                          " now accepts the same props as the transition component you passed in, with some key differences:"),
                      createElement("li", null,
                          "Any props that this ",
                          createElement("code", null, "Transition"),
                          " takes with both inline and block components, like ",
                          createElement("code", null, "fooInline"),
                          " and ",
                          createElement("code", null, "fooBlock"),
                          ", are now replaced with ",
                          createElement("code", null, "fooDynamic"),
                          ", which is relative to the location of the anchor to the menu."),
                      createElement("li", null,
                          "The menu will, based on the position of the anchor and current position of the menu, turn ",
                          createElement("code", null, "fooDynamic"),
                          " into ",
                          createElement("code", null, "fooInline"),
                          " or ",
                          createElement("code", null, "fooBlock"),
                          ", optionally negated (",
                          createElement("code", null, "1 - fooDynamic"),
                          ") if the menu is flipped because it's near the edge of the viewport."))))));
  }
  async function sleep$1(arg0) {
      return new Promise(resolve => setTimeout(resolve, arg0));
  }

  const RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");
  memo(({ setActive, active, depth }) => {
      return (createElement(Fragment, null,
          createElement("button", null, "Button 1"),
          createElement("button", null, "Button 2"),
          createElement("button", null, "Button 3"),
          createElement("label", null,
              "Active: ",
              createElement("input", { type: "checkbox", checked: active, onInput: e => { e.preventDefault(); setActive(e.currentTarget.checked); } }))));
  });
  const DemoDialog = memo(() => {
      const onClose = (() => setOpen(false));
      const [open, setOpen] = useState(false);
      return (createElement("div", { class: "demo" },
          createElement(Tooltip, { tooltip: "Open dialog", Transition: ZoomFade, zoomOriginDynamic: 0, zoomMin: 0.85 },
              createElement(InputGroup, null,
                  createElement(Checkbox, { checked: open, onCheck: setOpen }, "Open dialog"))),
          createElement(Dialog, { Transition: ClipFade, clipOriginBlock: 0, open: open, onClose: onClose, descriptive: false, title: "Dialog Title", footer: createElement("button", { onClick: onClose }, "Close") },
              createElement("p", { tabIndex: -1 }, "Dialog body content"),
              createElement("p", null, RandomWords.join(" ")),
              createElement("p", null, RandomWords.join(" ")),
              createElement("p", null, RandomWords.join(" ")),
              createElement("p", null, RandomWords.join(" ")),
              createElement("p", null, RandomWords.join(" ")))));
  });
  const DemoDrawer = memo(() => {
      const onClose = (() => setOpen(false));
      let [open, setOpen] = useState(false);
      //open = true;
      return (createElement("div", { class: "demo" },
          createElement(Checkbox, { checked: open, onCheck: setOpen }, "Open Drawer"),
          createElement(Drawer, { Transition: Slide, slideTargetInline: -1, open: open, onClose: onClose, descriptive: false, title: "Dialog Title" },
              createElement("p", { tabIndex: -1 }, "Dialog body content"),
              createElement("p", null, RandomWords.join(" ")),
              createElement("p", null, RandomWords.join(" ")),
              createElement("p", null, RandomWords.join(" ")))));
  });
  const DemoMenu = memo(() => {
      return (createElement("div", { class: "demo" },
          createElement(Menu, { Transition: ZoomFade, zoomOriginDynamic: 0, zoomMin: 0.85, tag: "ul", anchor: createElement(Button, { dropdownVariant: "combined" }, "Open menu") },
              createElement(MenuItem, { index: 0 }, "AItem #1"),
              createElement(MenuItem, { index: 1 }, "BItem #2"),
              createElement(MenuItem, { index: 2 }, "CItem #3"),
              createElement(MenuItem, { index: 3 }, "DItem #4"))));
  });
  const DemoTabs = memo(() => {
      const [selectedIndex, setSelectedIndex] = useState(0);
      const [selectionMode, setSelectionMode] = useState("activate");
      return (createElement("div", { class: "demo" },
          createElement("div", null,
              createElement(Tabs, { orientation: "block", onSelect: setSelectedIndex, selectedIndex: selectedIndex, selectionMode: selectionMode },
                  createElement("ol", null,
                      createElement(Tab, { index: 0 }, "Tab #1"),
                      createElement(Tab, { index: 1 }, "Tab #2"),
                      createElement(Tab, { index: 2 }, "Tab #3")),
                  createElement(TabPanel, { index: 0, Transition: ZoomFade, zoomMin: 0.8, zoomOriginBlock: 0 },
                      createElement("div", null, RandomWords.slice(0, Math.floor((1 / 3) * RandomWords.length)).join(" "))),
                  createElement(TabPanel, { index: 1, Transition: ZoomFade, zoomMin: 0.8, zoomOriginBlock: 0 },
                      createElement("div", null, RandomWords.slice(0, Math.floor((2 / 3) * RandomWords.length)).join(" "))),
                  createElement(TabPanel, { index: 2, Transition: ZoomFade, zoomMin: 0.8, zoomOriginBlock: 0 },
                      createElement("div", null, RandomWords.slice(0, Math.floor((3 / 3) * RandomWords.length)).join(" ")))))));
  });
  memo(() => {
      const { useTooltip, useTooltipTrigger, isOpen } = useAriaTooltip({});
      const { useTooltipProps } = useTooltip();
      const { useTooltipTriggerProps } = useTooltipTrigger();
      return (createElement("div", { class: "demo" },
          createElement("p", null,
              "This is a paragraph with a ",
              createElement("span", { ...useTooltipTriggerProps({}) }, "tooltip right here."),
              createElement("span", { ...useTooltipProps({ hidden: !isOpen }) }, "This is the tooltip content."))));
  });
  async function sleep(ms) {
      await new Promise(resolve => setTimeout(resolve, ms));
  }
  /*
  const DemoButtons = memo(() => {
      const [buttonsFill, setButtonsFill] = useState<"fill" | "outline">("outline");
      const [buttonsSize, setButtonsSize] = useState<"sm" | "md" | "lg">("md");

      const pushToast = usePushToast();
      function onClick(str: string) {
          return async function onClick() {
              await sleep(5000);
              pushToast(<Toast>Button was clicked ({str})</Toast>)
          }
      }

      return (
          <div class="demo">

              <ButtonGroup>
                  <ButtonGroupChild index={0} onClick={() => setButtonsFill("fill")} pressed={buttonsFill === "fill"} colorVariant="primary">Fill</ButtonGroupChild>
                  <ButtonGroupChild index={1} onClick={() => setButtonsFill("outline")} pressed={buttonsFill === "outline"} colorVariant="primary">Outline</ButtonGroupChild>
              </ButtonGroup>

              <ProvideDefaultButtonFill value={buttonsFill}>
                  <ProvideDefaultButtonSize value={buttonsSize}>
                      <ButtonGroup>
                          <ButtonGroupChild onClick={onClick("primary")} index={0} tag="button" colorVariant="primary">Primary</ButtonGroupChild>
                          <ButtonGroupChild onClick={onClick("secondary")} index={1} tag="button" colorVariant="secondary">Secondary</ButtonGroupChild>
                          <ButtonGroupChild onClick={onClick("success")} index={2} tag="button" colorVariant="success">Success</ButtonGroupChild>
                          <ButtonGroupChild onClick={onClick("warning")} index={3} tag="button" colorVariant="warning">Warning</ButtonGroupChild>
                      </ButtonGroup>
                      <ButtonGroup>
                          <ButtonGroupChild onClick={onClick("danger")} index={0} tag="button" colorVariant="danger">Danger</ButtonGroupChild>
                          <ButtonGroupChild onClick={onClick("info")} index={1} tag="button" colorVariant="info">Info</ButtonGroupChild>
                          <ButtonGroupChild onClick={onClick("light")} index={2} tag="button" colorVariant="light">Light</ButtonGroupChild>
                          <ButtonGroupChild onClick={onClick("dark")} index={3} tag="button" colorVariant="dark">Dark</ButtonGroupChild>
                          <ButtonGroupChild tag="a" index={4} href="#" colorVariant="link">Link</ButtonGroupChild>
                      </ButtonGroup>
                  </ProvideDefaultButtonSize>
              </ProvideDefaultButtonFill>
          </div>
      )
  });*/
  const DemoAccordion = memo(() => {
      const [expandedIndex, setExpandedIndex] = useState(-1);
      return (createElement("div", { class: "demo" },
          createElement("div", null,
              createElement(Accordion, { expandedIndex: expandedIndex, setExpandedIndex: setExpandedIndex },
                  createElement(AccordionSection, { index: 0, header: "Accordion Item #1" },
                      createElement("div", null,
                          createElement("strong", null, "This is the 1st item's accordion body."),
                          " It is visible by default, You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ",
                          createElement("code", null, "AccordionSection"),
                          ".")),
                  createElement(AccordionSection, { index: 1, header: "Accordion Item #2" },
                      createElement("div", null,
                          createElement("strong", null, "This is the 2nd item's accordion body."),
                          " It is hidden by default,  You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ",
                          createElement("code", null, "AccordionSection"),
                          ".")),
                  createElement(AccordionSection, { index: 2, header: "Accordion Item #3" },
                      createElement("div", null,
                          createElement("strong", null, "This is the 3rd item's accordion body."),
                          " It is hidden by default,  You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the ",
                          createElement("code", null, "AccordionSection"),
                          "."))))));
  });
  const DemoList = memo(() => {
      const [index, setIndex] = useState(0);
      return (createElement("div", { class: "demo" },
          "Selected: ",
          index,
          createElement(ListSingle, { select: "single", onSelect: setIndex, selectedIndex: index, selectionMode: "activate", tag: "ul" },
              createElement(ListItemSingle, { index: 0 }, "Primary"),
              createElement(ListItemSingle, { index: 1 }, "Secondary"),
              createElement(ListItemSingle, { index: 2 }, "Success"),
              createElement(ListItemSingle, { index: 3 }, "Warning"),
              createElement(ListItemSingle, { index: 4 }, "Danger"),
              createElement(ListItemSingle, { index: 5 }, "Info"),
              createElement(ListItemSingle, { index: 6 }, "Light"),
              createElement(ListItemSingle, { index: 7 }, "Dark"),
              createElement(ListItemSingle, { index: 8 }, "Link"))));
  });
  const DemoInput = memo(() => {
      const [text, setText] = useState("");
      const [radioValue, setRadioValue] = useState("");
      const onInput1 = useCallback(async (value) => {
          await sleep(5000);
          setText(value);
      }, [setRadioValue]);
      const onInput2 = useCallback(async (value) => {
          await sleep(5000);
          setRadioValue(value);
      }, [setRadioValue]);
      return (createElement("div", { class: "demo" },
          createElement(InputGroup, null,
              createElement(Input, { type: "text", onValueChange: onInput1, value: text, width: "100%" }, "Test input")),
          createElement(RadioGroup, { selectedValue: radioValue, name: "demo-radio", onValueChange: onInput2 },
              createElement(InputGroup, null,
                  createElement(Radio, { index: 0, value: "ARadio" })),
              createElement(InputGroup, null,
                  createElement(Radio, { index: 1, value: "BRadio" })),
              createElement(InputGroup, null,
                  createElement(Radio, { index: 2, value: "CRadio" })))));
  });
  const Component = () => {
      const [theme, setTheme] = useState("theme-dark");
      return createElement(Fragment, null,
          createElement(Button, { colorVariant: theme == "theme-dark" ? "light" : "dark", style: { position: "fixed", insetBlockStart: "0.5em", insetInlineEnd: "0.5em", zIndex: 9999999 }, spinnerTimeout: 999999999, onPress: async () => {
                  let prev = theme;
                  let next = prev === "theme-dark" ? "theme-light" : "theme-dark";
                  setTheme(next);
                  await new Promise(resolve => setTimeout(resolve, 100));
                  document.documentElement.classList.add("switching-theme");
                  document.documentElement.classList.add(next);
                  document.documentElement.classList.remove(prev);
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  document.documentElement.classList.remove("switching-theme");
              } },
              "Switch theme to ",
              createElement("strong", null, theme === "theme-dark" ? "light" : "dark")),
          createElement(GridResponsive, { minWidth: "35em" },
              createElement(DebugUtilContext.Provider, { value: useMemo(() => ({ logRender: new Set(["Menu", "MenuItem"]) }), []) },
                  createElement(ToastsProvider, null,
                      createElement(DemoTable, null),
                      createElement(DemoMenus, null),
                      createElement(DemoButtons, null),
                      createElement(DemoChecks, null),
                      createElement(DemoInputs, null),
                      createElement(DemoLayout, null),
                      createElement(DemoAccordion, null),
                      createElement(DemoDialog, null),
                      createElement(DemoDrawer, null),
                      createElement(DemoInput, null),
                      createElement(DemoList, null),
                      createElement(DemoTabs, null),
                      createElement(DemoMenu, null)))));
  };
  requestAnimationFrame(() => {
      render(createElement(Component, null), document.getElementById("root"));
  });

})();
