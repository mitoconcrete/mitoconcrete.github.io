class Node {
    constructor(location, priority){
        this.location = location;
        this.priority = priority;
    }
}

class Queue {
    constructor(){
        this.queue = [];
        this.head = 0;
        this.rear = 0;
    }
    
    enqueue(location, priority){
        this.queue[this.rear++] = new Node(location, priority)
    }
    
    dequeue(){
        const value = this.queue[this.head]
        delete this.queue[this.head++]
        return value
    }
}


function solution(priorities, location){
    const queue = new Queue()
    priorities.forEach((priority, location) => queue.enqueue(location, priority))
    
    let count = 0;
    while(true){
        const target = queue.dequeue()
        // 큐 안에 우선순위가 더 높은 값이 있다면 다시 큐안에 넣는다.
        // 큐 안에 우선순위가 더 높은 값이 없다면 count + 1 해준다.
        const hasHighVal = queue.queue.filter(v=> v.priority > target.priority).length > 0
        if(hasHighVal){
            queue.enqueue(target.location, target.priority)
        }else{
            count += 1
            if(target.location === location){
                console.log(count)
                return count
            }
        }
    }
}


solution([2, 1, 3, 2], 2)