module.exports = {

    /**
     * 快速排序GameMode
     *
     * @param pData
     *            需要排序的数组
     * @param left
     *            左边的位置,初始值为0
     * @param right
     *            右边的位置,初始值为数组长度
     * @param smallToBig
     *            从小到大 反之从大到小
     */
    QuickSortGameMode(pData, left, right, smallToBig) {
        try {
            var i, j;
            var first, temp;
            i = left;
            j = right;
            first = pData[left]; // 这里选其他的数也行，不过一般选第一个
            // 一趟快速排序
            while (true) {
                // 从第二个数开始找大于中枢的数 ,从前面开始找大于pData[left]的数
                if (smallToBig) {
                    while ((++i) < right - 1 && pData[i].ByOrder < first.ByOrder)
                        ;
                    // 从最后一个数开始找第一个小于中枢pData[left]的数
                    while ((--j) > left && pData[j].ByOrder > first.ByOrder)
                        ;
                } else {
                    while ((++i) < right - 1 && pData[i].ByOrder > first.ByOrder)
                        ;
                    // 从最后一个数开始找第一个小于中枢pData[left]的数
                    while ((--j) > left && pData[j].ByOrder < first.ByOrder)
                        ;
                }
                if (i >= j)
                    break;
                // 交换两边找到的数
                temp = pData[i];
                pData[i] = pData[j];
                pData[j] = temp;
            }
            // 交换中枢
            pData[left] = pData[j];
            pData[j] = first;
            // 递归快排中枢左边的数据
            if (left < j)
                this.QuickSortGameMode(pData, left, j, smallToBig);
            // 递归快排中枢右边的数据
            if (right > i)
                this.QuickSortGameMode(pData, i, right, smallToBig);
        } catch (ex) {
        }
    },

    /**
     * 快速排序
     *
     * @param pData
     *            需要排序的数组
     * @param left
     *            左边的位置,初始值为0
     * @param right
     *            右边的位置,初始值为数组长度
     * @param smallToBig
     *            从小到大 反之从大到小
     */
    QuickSortInt(pData, left, right, smallToBig) {
        try {
            var i, j;
            var first, temp;
            i = left;
            j = right;
            first = pData[left]; // 这里选其他的数也行，不过一般选第一个
            // 一趟快速排序
            while (true) {
                // 从第二个数开始找大于中枢的数 ,从前面开始找大于pData[left]的数
                if (smallToBig) {
                    while ((++i) < right - 1 && parseInt(pData[i]) < parseInt(first))
                        ;
                    // 从最后一个数开始找第一个小于中枢pData[left]的数
                    while ((--j) > left && parseInt(pData[j]) > parseInt(first))
                        ;
                } else {
                    while ((++i) < right - 1 && parseInt(pData[i]) > parseInt(first))
                        ;
                    // 从最后一个数开始找第一个小于中枢pData[left]的数
                    while ((--j) > left && parseInt(pData[j]) < parseInt(first))
                        ;
                }
                if (i >= j)
                    break;
                // 交换两边找到的数
                temp = pData[i];
                pData[i] = pData[j];
                pData[j] = temp;
            }
            // 交换中枢
            pData[left] = pData[j];
            pData[j] = first;
            // 递归快排中枢左边的数据
            if (left < j)
                this.QuickSortInt(pData, left, j, smallToBig);
            // 递归快排中枢右边的数据
            if (right > i)
                this.QuickSortInt(pData, i, right, smallToBig);
        } catch (ex) {
        }
    }
};