import React, { useState } from 'react';
import axios from 'axios';

import AddAlertIcon from '@mui/icons-material/AddAlert';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Category from './Category';
import { createTaskPath } from '../../ApiPath';
import { dateCreate } from '../../utils/DateUtils';

const createTask = async (header, date, time, comment, category) => {
	const response = await axios
		.post(
			createTaskPath(),
			{
				header: header,
				plannedImplDate: dateCreate(date, time),
				comment: comment,
				category: category,
			},
			{
				withCredentials: true,
			}
		)
		.catch(error => {
			console.error('Error fetching data: ', error);
		});
};

export default function CreateTask() {
	const [selectedValue, setSelectedValue] = useState('null');

	const handleChangeCategory = event => {
		setSelectedValue(event.target.value);
	};

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		createTask(data.get('header'), data.get('date'), data.get('time'), data.get('comment'), selectedValue);
	};

	const notification = [];

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			notification.push();
			console.log(notification);
		}
	};

	return (
		<form onSubmit={handleSubmitSave}>
			<Typography variant='h4' sx={{ marginTop: 2, marginLeft: 8, marginRight: 32 }}>
				Создать задачу
			</Typography>
			<List sx={{ marginLeft: 8, marginRight: 32 }}>
				<List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
					<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
							<Typography sx={{ fontSize: 22 }}>🔠 Заголовок</Typography>
							<OutlinedInput id='header' name='header' />
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
							<Typography sx={{ fontSize: 22 }}>📂 Категория</Typography>
							<Category change={handleChangeCategory} value={selectedValue} />
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: 1, marginRight: 1 }}>
							<Typography sx={{ fontSize: 22 }}>🗓️ Дата выполнения</Typography>
							<OutlinedInput id='date' name='date' placeholder='дд.мм.гггг' />
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: 1, marginLeft: 1 }}>
							<Typography sx={{ fontSize: 22 }}>⏰ Время выполнения</Typography>
							<OutlinedInput id='time' name='time' placeholder='чч:мм' />
						</Box>
					</Box>

					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
						<Typography sx={{ fontSize: 22 }}>🔔 Уведомления</Typography>
						{/* <p>*Убедитесь, что в профиле есть данные о вашем tg</p> */}
						<Box sx={{ display: 'flex' }}>
							<OutlinedInput id='notification' name='notification' onKeyDown={handleKeyDown} placeholder='дд.мм.гггг чч:мм' />
							<Button sx={{ color: 'green', marginLeft: 1, border: 1, borderColor: 'green', borderRadius: 2 }}>
								<AddAlertIcon />
							</Button>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
						<Typography sx={{ fontSize: 22 }}>📝 Комментарий</Typography>
						<TextField id='comment' name='comment' multiline rows={4} variant='filled' />
					</Box>
				</List>
				<Button type='submitSave' variant='contained' color='success' sx={{ width: '100%', marginTop: 1 }}>
					Сохранить
				</Button>
			</List>
		</form>
	);
}
