/**
 * Created by zoufeng on 2017/6/21.
 */
export function count(o) {
    let t = typeof o;
    if(t === 'string')
    {
        return o.length;
    }
    else if(t === 'object')
    {
        let n = 0;
        for(let i in o)
        {
            n++;
        }
        return n;
    }
    return false;
}