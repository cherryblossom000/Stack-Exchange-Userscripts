import { showToastError } from '../../../common/showToast';
import { fixCommentTab } from './fixCommentTab';
import { styleTag } from './styleTag';

export const watchForCommentTab = () => {
    // When user goes to comments tab, append style tag and call fixCommentTab
    // When user navigates to another tab under All Actions (they'll still be on the same page), remove the style tag if it's appended
    const mainBarFull = document.querySelector('#mainbar-full')!;
    const onMutation = () => {
        const commentTabHighlighted = (document.querySelector('#user-tab-activity .youarehere') as HTMLAnchorElement).href.endsWith('&sort=comments');
        if (!commentTabHighlighted) {
            styleTag.remove();
            return;
        }
        document.body.appendChild(styleTag);
        fixCommentTab()
            .catch((error) => {
                console.error(error);
                showToastError('Stack Comment History Checker: An error occurred, see console for details');
            });
    };
    new MutationObserver(onMutation)
        .observe(mainBarFull, { childList: true });
    window.StackExchange.ready(onMutation);
};
