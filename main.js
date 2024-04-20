function recursiveUnfollow(count = 1) {
    //  Parent node
    const parentItem = document.evaluate('.//*[contains(concat(" ", normalize-space(@class), " "), " css-")][contains(concat(" ", normalize-space(@class), " "), "-DivUserListContainer")]', document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)?.singleNodeValue;
    //  List item
    const item = parentItem?.firstElementChild;
    //  Current scroll top and new scroll top
    const currentScrollTop = (parentItem?.scrollTop) ?? 0;
    const newScrollTop = currentScrollTop + 1000;
    //  Check if list item exists 
    if (!item) {
        console.error("Following/Followers tab not visible, please goto: https://www.tiktok.com/@your_username and click on one of the tabs")
        return;
    };
    // Save username and button to unfollow
    const username = document.evaluate('.//*[contains(concat(" ", normalize-space(@class), " "), " css-")][contains(concat(" ", normalize-space(@class), " "), "-PUniqueId")]', item, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)?.singleNodeValue?.textContent.trim();
    const btnUnfollow = document.evaluate('.//*[contains(concat(" ", normalize-space(@class), " "), " css-")][contains(concat(" ", normalize-space(@class), " "), "-Button-StyledFollowButtonV2")]', item, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)?.singleNodeValue;
    // Save confirmation
    const actionResult = confirm(`Do you want to unfollow "${username}"?`);
    // If action is confirmed, unfollow
    if (actionResult) btnUnfollow.click();
    // For debugging
    console.warn("Loop:", count, "Username deleted", actionResult)
    // If limit is reached, ask for confirmation and reset count
    if (count >= 10) {
        console.warn("Limit surpassed");
        if (!confirm("¿Still there?")) {
            console.error("Closing script");
            return;
        }
        count = 0;
    };
    //  Timeout for next loop
    setTimeout(() => {
        //  Remove list item
        item.remove();
        //  Scroll to new position
        if (parentItem) {
            parentItem.scrollTop = newScrollTop;
            parentItem.scrollTop = currentScrollTop;
        }
        //  Recursive call
        recursiveUnfollow(count + 1)
    }, 10);
}
