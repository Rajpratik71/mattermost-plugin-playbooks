import React, {useState} from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {mdiCheckAll, mdiPlayOutline, mdiCircleSmall} from '@mdi/js';

import {setChecklistItemState} from 'src/client';
import {ChecklistItemState} from 'src/types/playbook';
import {ChecklistItem as ItemComponent} from 'src/components/checklist_item/checklist_item';
import {HoverMenu} from 'src/components/checklist_item/hover_menu';
import {PlaybookRunChecklistItem} from 'src/types/playbook_run';

interface Props {
    item: PlaybookRunChecklistItem;
    enableAnimation: boolean;
}

const Task = (props: Props) => {
    const [removed, setRemoved] = useState(false);

    // Handles onchange with animation
    // if state changes from open to closed, set removed state and waits for 1 sec
    const onChangeState = (newState: ChecklistItemState) => {
        let prom;
        if (props.enableAnimation && props.item.state === ChecklistItemState.Open && newState === ChecklistItemState.Closed) {
            setRemoved(true);
            setTimeout(() => {
                prom = setChecklistItemState(props.item.playbook_run_id, props.item.checklist_num, props.item.item_num, newState);
            }, 700);
        } else {
            prom = setChecklistItemState(props.item.playbook_run_id, props.item.checklist_num, props.item.item_num, newState);
        }
        return prom;
    };

    return (
        <Container className={removed ? 'removed' : ''}>
            <Header>
                <Icon
                    path={mdiPlayOutline}
                    size={1}
                />
                <HeaderText>{props.item.playbook_run_name}</HeaderText>
                <Icon
                    path={mdiCircleSmall}
                    size={1}
                />
                <Icon
                    path={mdiCheckAll}
                    size={1}
                />
                <HeaderText>{props.item.checklist_title}</HeaderText>
            </Header>
            <Body>
                <ItemComponent
                    checklistItem={props.item}
                    playbookRunId={props.item.playbook_run_id}
                    checklistNum={props.item.checklist_num}
                    dragging={false}
                    collapsibleDescription={true}
                    newItem={false}
                    disabled={false}
                    itemNum={props.item.item_num}
                    onChange={onChangeState}
                />
            </Body>
        </Container>
    );
};

export default Task;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;


    &.removed {
        -webkit-animation: disapear 1s;
        -webkit-animation-fill-mode: forwards;
        animation: disapear 1s;
        animation-fill-mode: forwards;
    }

    @-webkit-keyframes disapear{
        50% {
            -webkit-transform: translateX(-5%);
            transform: translateX(-5%);
        }

        100% {
            -webkit-transform: translateX(200%);
            transform: translateX(200%);
        }
    }

    @keyframes disapear{
        50% {
            -webkit-transform: translateX(-5%);
            transform: translateX(-5%);
        }

        100% {
            -webkit-transform: translateX(200%);
            transform: translateX(200%);
        }
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const HeaderText = styled.div`
    font-size: 12px;
    line-height: 16px;
    color: rgba(var(--center-channel-color-rgb), 0.72);
    font-weight: 600;
    margin: 0 4px;
`;

// Necessary hack to use Checklist without DraggableProvider and use HoverMenu
const Body = styled.div`
    &:hover,
    &:focus-within {
        ${HoverMenu} {
            opacity: 1;
        }
    }
`;

