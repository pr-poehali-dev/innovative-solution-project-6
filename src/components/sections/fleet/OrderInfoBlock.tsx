import Icon from "@/components/ui/icon";
import { orderItems } from "./data";

const OrderInfoBlock = () => (
  <div className="border border-accent/10 rounded-2xl bg-accent/5 p-5 sm:p-10">
    <h3 className="font-display font-bold text-lg sm:text-2xl mb-4 sm:mb-6 text-center">Что сообщить при заказе</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {orderItems.map((item, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-3 bg-background/30 rounded-xl p-3 sm:p-4 border border-accent/10 hover:border-accent/30 transition-colors">
          <div className={`w-9 h-9 bg-gradient-to-br ${item.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
            <Icon name={item.icon} size={16} className="text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{item.text}</span>
        </div>
      ))}
    </div>
    <p className="text-center text-muted-foreground mt-4 sm:mt-6 text-sm">
      Позвоните нам — специалист выслушает пожелания, уточнит объём работ и подберёт подходящую технику
    </p>
  </div>
);

export default OrderInfoBlock;
