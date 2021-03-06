import {inject, bindable} from 'aurelia-framework';
import {FnTs} from '../models/FnTs';
import {AggregateData} from '../models/message_queue';

@bindable({ name: 'modal', defaultValue: 'na' })
@bindable({ name: 'view', defaultValue: 'na' })
@bindable({ name: 'width', defaultValue: '' })
@inject(FnTs)
export class CpkModal {

	private my_guid: string;
	private parent: any;
	//element bindings
	view: string;
	modal: string;
	width: number;
	//properties
	guid: string;
	app_events: any;
	modal_obj: any;
	modal_data: any;

	constructor(private fn: FnTs) {
		this.guid = this.generateGUID();
	}

	attached() {
		this.app_events = this.fn.mq.Subscribe((event: AggregateData) => {
            if (this[event.event_name] != null) { this[event.event_name](event.data); }
        });
	}

	detached() {
		this.app_events.dispose();
	}

	activate(parent: any) {
		if (parent == null) {
			this.parent = parent;
			this.my_guid = parent.guid;
		}
	}

	generateGUID() {
		var gen = () => {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return (gen() + gen() + '-' + gen() + '-' + gen() + '-' + gen() +
				'-' + gen() + gen() + gen());
	}

	showModal(data: any) {
		if (this.modal == data.modal) {
			this.modal_data = data;
			this.modal_obj = this;
			setTimeout(() => { this.fn.mq.SendMessage({event_name: this.guid,  data: data}); }, 10);
			$(".cpk-modal", ('.' + this.guid)).show();
			$(".modal-back", ('.' + this.guid)).show();
		}
	}

	close_modal() {
		$(".cpk-modal", ('.' + this.guid)).hide();
		$(".modal-back", ('.' + this.guid)).hide();
	}

	apply_changes() {
		this.fn.mq.SendMessage({
			event_name: 'onModalClose',
			target: this.modal_data.reply_target, 
			data: this.modal_data
		});
		this.close_modal();
	}

}
