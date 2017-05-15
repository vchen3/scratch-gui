const isEqual = require('lodash.isequal');
const omit = require('lodash.omit');
const classNames = require('classnames');
const React = require('react');

const VM = require('scratch-vm');

const Box = require('../box/box.jsx');
const BackdropLibrary = require('../../containers/backdrop-library.jsx');
const CostumeLibrary = require('../../containers/costume-library.jsx');
const SpriteLibrary = require('../../containers/sprite-library.jsx');
const SpriteSelectorComponent = require('../sprite-selector/sprite-selector.jsx');
const StageSelector = require('../../containers/stage-selector.jsx');

// Imports edited sprite library
const mySpriteLibraryContent = require('../../lib/libraries/sprites.json');

const styles = require('./target-pane.css');
const addIcon = require('./icon--add.svg');

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
class TargetPane extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            // Do a normal shallow compare on all props except sprites
            Object.keys(omit(nextProps, ['sprites']))
                .reduce((all, k) => all || nextProps[k] !== this.props[k], false) ||
            // Deep compare on sprites object
            !isEqual(this.props.sprites, nextProps.sprites)
        );
    }

    render () {
        const {
            editingTarget,
            backdropLibraryVisible,
            costumeLibraryVisible,
            spriteLibraryVisible,
            onChangeSpriteDraggability,
            onChangeSpriteName,
            onChangeSpriteRotationStyle,
            onChangeSpriteVisibility,
            onChangeSpriteX,
            onChangeSpriteY,
            onDeleteSprite,
            onNewSpriteClick,
            onNewBackdropClick,
            onRequestCloseBackdropLibrary,
            onRequestCloseCostumeLibrary,
            onRequestCloseSpriteLibrary,
            onSelectSprite,
            stage,
            sprites,
            vm,
            editorType,
            ...componentProps
        } = this.props;

        // Function to add a random sprite
        var addRandomSprite = function addRandomSprite(){
            //Get random sprite
            var librarySize = mySpriteLibraryContent.length
            var spriteInt = Math.floor(Math.random() * librarySize)
            var randomSprite = mySpriteLibraryContent[spriteInt]
            // Add new sprite to screen
            vm.addSprite2(randomSprite.json)

        };

        // Only create button and sprite library if "open in Scratch" is clicked, or if it's a default project
        // (Don't show in the microworlds case).
        var addNewButton, addNewLibrary = null;
        if (this.props.editorType >=3 || !this.props.editorType) {
            addNewButton = (
                <button
                    className={classNames(styles.addButtonWrapper, styles.addButtonWrapperSprite)}
                    onClick={addRandomSprite}
                >
                    <img
                        className={styles.addButton}
                        src={addIcon}
                    />
                </button>
            )
            addNewLibrary = (
                <SpriteLibrary
                    visible={spriteLibraryVisible}
                    vm={vm}
                    onRequestClose={onRequestCloseSpriteLibrary}
                />
            )
        }
        return (
            <Box
                className={styles.targetPane}
                {...componentProps}
            >
                <SpriteSelectorComponent
                    selectedId={editingTarget}
                    sprites={sprites}
                    onChangeSpriteDraggability={onChangeSpriteDraggability}
                    onChangeSpriteName={onChangeSpriteName}
                    onChangeSpriteRotationStyle={onChangeSpriteRotationStyle}
                    onChangeSpriteVisibility={onChangeSpriteVisibility}
                    onChangeSpriteX={onChangeSpriteX}
                    onChangeSpriteY={onChangeSpriteY}
                    onDeleteSprite={onDeleteSprite}
                    onSelectSprite={onSelectSprite}
                />
               {addNewButton}
               {addNewLibrary}
            </Box>
        );
    }
}
const spriteShape = React.PropTypes.shape({
    costume: React.PropTypes.shape({
        skin: React.PropTypes.string,
        name: React.PropTypes.string,
        bitmapResolution: React.PropTypes.number,
        rotationCenterX: React.PropTypes.number,
        rotationCenterY: React.PropTypes.number
    }),
    draggable: React.PropTypes.bool,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    order: React.PropTypes.number,
    rotationStyle: React.PropTypes.string,
    visibility: React.PropTypes.bool,
    x: React.PropTypes.number,
    y: React.PropTypes.number
});

TargetPane.propTypes = {
    backdropLibraryVisible: React.PropTypes.bool,
    costumeLibraryVisible: React.PropTypes.bool,
    editingTarget: React.PropTypes.string,
    onChangeSpriteDraggability: React.PropTypes.func,
    onChangeSpriteName: React.PropTypes.func,
    onChangeSpriteRotationStyle: React.PropTypes.func,
    onChangeSpriteVisibility: React.PropTypes.func,
    onChangeSpriteX: React.PropTypes.func,
    onChangeSpriteY: React.PropTypes.func,
    onDeleteSprite: React.PropTypes.func,
    onNewBackdropClick: React.PropTypes.func,
    onNewSpriteClick: React.PropTypes.func,
    onRequestCloseBackdropLibrary: React.PropTypes.func,
    onRequestCloseCostumeLibrary: React.PropTypes.func,
    onRequestCloseSpriteLibrary: React.PropTypes.func,
    onSelectSprite: React.PropTypes.func,
    spriteLibraryVisible: React.PropTypes.bool,
    sprites: React.PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    vm: React.PropTypes.instanceOf(VM)
};

module.exports = TargetPane;